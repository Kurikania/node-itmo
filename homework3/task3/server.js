// 3***. Задание на HTML, CSS, JS (Ajax) и NodeJS: Разработать сервер,
// который умеет отдавать запрашиваемые html страницы и JSON данные.
// Дана страница с товарами product.html. Дан файл products.json в
// котором есть 8 товаров. По загрузке страницы product.html страница
// запрашивает первые четыре товара с сервера из файла products.json,
// и отстраивает краткие карточки четырёх товаров. Внизу страницы
// product.html расположена кнопка «Показать ещё товары» по нажатию
// на которые догружается оставшиеся 4 товара из файла products.json
// и отстраиваются их карточки.

var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var mimeTypes = {
  ".js": "text/javascript",
  ".html": "text/html",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

http
  .createServer(function onRequest(request, response) {
    var pathname = url.parse(request.url).path;
    if (pathname == "/") pathname = "/index.html";
    var extname = path.extname(pathname);
    var mimeType = mimeTypes[extname];
    pathname = pathname.substring(1, pathname.length);

    if (extname == ".png" || extname == ".jpg") {
      var img = fs.readFileSync("./" + pathname);
      response.writeHead(200, { "Content-Type": mimeType });
      response.end(img, "binary");
    } else if (extname == ".json") {
      fs.readFile(pathname, "utf8", function (err, data) {
        if (err) {
          console.log(
            "Could not find or open file " + pathname + " for reading\n"
          );
        } else {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(data);
        }
      });
    } else {
      fs.readFile(pathname, "utf8", function (err, data) {
        if (err) {
          console.log(
            "Could not find or open file " + pathname + " for reading\n"
          );
        } else {
          response.writeHead(200, { "Content-Type": mimeType });
          response.end(data);
        }
      });
    }
  })
  .listen(8080, () => {
    console.log("on port 8080");
  });
