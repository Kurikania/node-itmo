// На основе задачи 2 реализуйте POST форму регистрации: логин, почта, пароль.
//  Обработайте получение данных из формы в роутере (пример создания роутера представлен в задаче 1).
let express = require("express"); //подключаем модуль express
let app = express()
let bodyParser = require("body-parser"); /*подключаем модуль для обработки содержимого тела post запроса */
let mustacheExpress = require('mustache-express');

app.set('views', __dirname + '/views'); 
app.engine('mustache', mustacheExpress()); 
app.set('view engine', 'mustache'); 

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req,res) => {
  res.render('auth');
})

let route = require('./auth/auth');
app.use('/auth', route);

app.listen(8080, () => {
    console.log("HTTP server works in 8080 port!\n");
  });