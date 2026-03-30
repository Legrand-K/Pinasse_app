
const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

const corsOptions = {
  origin: "http://localhost:3002"
};

app.set('json spaces', 2)
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
(async () => {
  await db.sequelize.sync({ force: false });
  console.clear();
  console.log("database ready !");
})();

app.get("/", (req, res) => {
  res.json({ message: "Hello world." });
});

require("./app/routes")(app,path);
require("./app/services/upload/routes")(app, express, path);

/*
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
});
*/

module.exports = app;