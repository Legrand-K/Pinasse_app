
module.exports = (app, express, path) => {
    app.use('/uploads', express.static(path.join(__dirname, '../../../uploads')));
};