var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const { db2france } = require("./configbasefrance");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("./config.json");
const afficheimage = require("./services/affiche");

const Agentchauff = require("./routes/ChauffeurRoute");
const con = require("./routes/ContactRoute");
const Voi = require("./routes/VoitureRoutes");
const his = require("./routes/HistoRoute");
const transfert = require("./routes/TransfertRoute");
const tariftransfert = require("./routes/TariftransfertRoute");
const paymentRoutes = require('./routes/paymentRoutes');
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const Voifr = require("./routes/Voiturefranceroute");
const chaufffr = require("./routes/chauffeurfrranceRoute");
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("DB Connection Estabblished !");
});





var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
const corsOptions = {
  //origin:'https://frontwebpfe-ashen.vercel.app',
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/afficheimage", afficheimage);
app.use("/Chauff", Agentchauff);
app.use("/Voi", Voi);
app.use("/Chaufffrance", chaufffr);
app.use("/Voifrance", Voifr);
app.use("/Con", con);
app.use("/hist", his);
app.use("/transfert", transfert);
app.use("/tariftransfert", tariftransfert);
app.use('/payment', paymentRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});

module.exports = app;
