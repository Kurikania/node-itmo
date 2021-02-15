// 1*****. Разработать свой граббер (парсер, веб паук), который умеет парсить выбранный вами сайт и
//сохранять полезную информацию в виде файлов на сервере.
// Тематика парсера на ваш выбор: рецепты пирогов, тексты песен, телевизионная программа и т.п.
// моя ссылка https://homework-3-kurikania.herokuapp.com/articles
// Мой очень упрощенный пример 

let https = require("https");
let cheerio = require("cheerio"); //Сторонняя библиотека наподобие jQuery
let fs = require("fs");
let url = "https://homework-3-kurikania.herokuapp.com/articles"

//Функция скачивает контент по переданной ссылке
function download(url, callback) {
  console.log("Task: " + url);
  https.get(url, function (res) {
      console.log("Got response: " + res.statusCode);
      let content = "";
      res.on("data", function (chunk) {
        content += chunk;
      });
      res.on("end", function () {
        console.log("Downloaded site: " + url);
        callback(null, content);
      });
    })
    .on("error", function (e) {
      console.log("Got error: " + e.message);
      callback(e);
    });
}

function spiderLink(callback) {  
    //Загрузка страницы    
      download(url, function (err, content) {
        if (err) return callback(err);
        $ = cheerio.load(content);
        text = $("article").text();
        fs.stat('/', function (err, stats) {
              fs.writeFile('./articles.txt', text, { encoding: "utf8" }, function (err) {
                  if (err) return callback(err);
                  console.log("Save file: " + '/' + "\n");
                  callback();
                });
            });
      });
  }

function spider(url, callback) {
  download(url, function (err, content) {
    if (err) return callback(err);        
      spiderLink(callback);      
  });
}


spider(url, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Контент загружен");
  }
});
