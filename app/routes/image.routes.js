var fs = require('fs');  
var path = require('path');
http = require('http'),
    https = require('https');


const {RequestMiddleware} = require('../services/upload');
//const {ImageService} = require('../services/upload');

const router = require("express").Router();
router.use(new RequestMiddleware().init);
//router.use(new RequestMiddleware().getFile);

module.exports = (app, route) => {

   router.get('/getImage/:filename', (request, response) => {

   let fileName = request.params.filename;

   // setup your path as per your project folder

   let pathToCheck= path.join(__dirname, '../../app/uploads/' +fileName);
   console.log('pathToCheck==',pathToCheck);

   // __dirname : will give you current directory path
   
   // checking if file exists or not 
   if (fs.existsSync(pathToCheck)) {
    //console.log('image trouvée', fs.existsSync(pathToCheck));
       // file found , display it 
       let imageUrl = `${request.protocol}://${request.headers.host}/app/uploads/${fileName}`;
       console.log('image trouvée', imageUrl);
       //new RequestMiddleware().getFile(fileName);
       //response.send({ imageUrl : imageUrl });
       //downloadImageFromURL(imageUrl, fileName);
       response.writeHead(200, {
         "Content-Type": "image/png" });
         fs.readFile(pathToCheck,function (err, content) {
            console.log('contenu', imageUrl);
                       
            response.end(content);
                     
            });
   }else{
        // file not found , render error 404 page 
       response.send('error404');
   }

});

var Stream = require('stream').Transform;

// Download Image Helper Function
var downloadImageFromURL = (url, filename, callback) => {

    var client = http;
    if (url.toString().indexOf("https") === 0) {
        client = https;
    }

    client.request(url, function(response) {
        var data = new Stream();

        response.on('data', function(chunk) {
            data.push(chunk);
        });

        response.on('end', function() {
            fs.writeFileSync(filename, data.read());
        });
    }).end();
};

app.use(route, router);

}