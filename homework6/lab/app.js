let express = require("express");
let mustacheExpress = require("mustache-express"); //подключаем шаблонизатор
let bodyParser = require("body-parser"); //подключаем парсер тела POST запросов
let app = express(); 

let widgetRoute = require("./routes/widgets.js");
//регистрируем модуль шаблонизации Mustache в Express
app.set("views", __dirname + "/views");
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
//регистрируем модуль парсера тела POST запросов
app.use(bodyParser.urlencoded({ extended: false }));
//регистрируем роутер по пути: /widgets
app.use("/widgets", widgetRoute);
//вешаем обработчик отдачи стартовой страницы
app.get("/", (req, res, next) => {
  res.render("index", { title: "Task:" });
});
app.listen(3000, () => {
    console.log("HTTP server works in 3000 port!\n");
  });
