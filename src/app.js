const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

// connecting to db se abre el mongoose en terminal se genera
mongoose
  .connect("mongodb://localhost/crud-mongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }) //nombre de la base de datos crud-mongo
  .then((db) => console.log("DB connected"))
  .catch((err) => console.log(err));

// importing routes
const indexRoutes = require("./routes/index");

// settings
app.set("port", process.env.PORT || 8000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares (funcion que se efecuta antes de llegar a las rutas)
app.use(morgan("dev"));
//entender los datos que se envien desde un formulario
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", indexRoutes); //definimos las rutas que vamos a crear

// starting the server

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
