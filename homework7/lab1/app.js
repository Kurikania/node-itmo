const express = require("express");
const cookieParser = require("cookie-parser"); //подключаем парсер заголовков с cookies
const logger = require("morgan"); //подключаем модуль логирования в консоль запросов
const mustacheExpress = require("mustache-express"); //подключаем шаблонизатор
const bodyParser = require("body-parser"); //подключаем парсер тела запросов
const app = express();
const adminRout = require("./routes/admin.js"); //подключаем модуль роутера по работе с панелью администратора

app.set("views", __dirname + "/views"); //регистрируем модуль шаблонизации Mustache в Express
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");

app.use(logger("dev"));//регистрируем модуль логгера

app.use(bodyParser.json()); //регистрируем модуль парсера тела запросов в котором хранится JSON строка

app.use(bodyParser.urlencoded({ extended: false })); //регистрируем модуль парсера тела POST запросов

app.use(cookieParser()); //регистрируем парсер заголовков с cookies

app.use(express.static("public")); //подключаем статический сервер на папку public
//регистрируем роутер по пути: /admin
app.use("/admin", adminRout);
app.listen(8000, () => {
    console.log("Run on 8000")
});
