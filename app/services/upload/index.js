

const path = require('path');
const util = require("util");
const multer = require('multer');
const { v4 } = require('uuid');
const { exit } = require('process');
fs = require('fs-extra');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './app/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname));
    }
});

const imageFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(new Error(`field ${file.fieldname} goes wrong on the mimetype`), false);
    }
};

const documentFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        cb(null, true);
    } else {
        cb(new Error(`field ${file.fieldname} goes wrong on the mimetype`), false);
    }
};
class RequestMiddleware {
    constructor() {
    }
    async init(req, res, next) {
        await new UploadService().init(req, res);
        next();
    }
}
class UploadService {
    #multerConfig;
    fileUpload;

    async init(req, res, size = (2 * 1000 * 1000), filter = 'imageFilter') {
        let isInit = false;
        let error;
        try {
            await this.loadConfig(size, filter)(req, res);
            this.bulidRequest(req);
            isInit = true;
        } catch (err) {
            error = err;
        }
        return [isInit, error];
    }
    loadConfig(size, filter = 'imageFilter') {
        this.#multerConfig = multer(
            {
                storage: fileStorage,
                limits:
                {
                    fileSize: size
                },
                fileFilter: filter = 'imageFilter' ? imageFilter : documentFilter
            }
        ).any();
        this.fileUpload = util.promisify(this.#multerConfig);
        return this.fileUpload;
    }
    getFile(fieldname, req) {
        let file;
        if (req.files !== undefined) {
            file = req.files.find(function (post, index) {
                if (post.fieldname == fieldname)
                    return true;
            });
        }
        return file;
    }
    moveFile(file, destination) {
        fs.move(file.destination + file.filename, destination, function (err) {
            if (err) {
                return console.error(err);
            }
        })
    }

    deleteFile(destination) {
        fs.unlink(destination, function (err) {
            if (err) {
                //return console.error(err);
            }
        })
    }

    bulidRequest(req) {
        if (req.files !== undefined) {
            for (let file of req.files) {
                if (file instanceof Object) {
                    if ((req.body[file.fieldname] !== undefined) && (req.body[file.fieldname] != '')) {
                        let destination = file.destination + path.basename(req.body[file.fieldname]);
                        this.deleteFile(destination);
                    }
                    req.body[file.fieldname] = file.filename;
                }
            }
        }
    }
}
module.exports = {
    RequestMiddleware,
    UploadService
};