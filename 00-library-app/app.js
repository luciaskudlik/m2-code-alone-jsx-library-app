require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const booksRouter = require("./routes/booksRouter");
const authorsRouter = require("./routes/authorsRouter");
const mongoose = require("mongoose");
const erv = require("express-react-views");
const bodyParser = require("body-parser");

const DB_NAME = "library";

const app = express();

// DB CONNECTION

mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    console.log(`Connected to DB: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.log("Error connecting to mongo", err);
  });

//VIEW ENGINE SETUP
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", erv.createEngine());

//MIDDLEWARE

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Add the newly created books router:
app.use("/books", booksRouter);

//Add the authors router:
app.use("/authors", authorsRouter);

//home page route
app.get("/", (req, res, next) => {
  res.render("Home");
});

module.exports = app;
