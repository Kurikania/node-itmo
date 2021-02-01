// 2**. Задание на HTML, CSS, JS (Ajax) и NodeJS: Разработать сервер,
// который умеет отдавать запрашиваемые html страницы и JSON файлы.
// Дана страница index.html. В ней есть блок #container и кнопка вне
// этого блока. Дан также файл users.json, в ней хранится массив
// пользователей в формате JSON. Сделайте так, чтобы по нажатию на
// кнопку в #container появился список пользователей из users.json в
// виде списка <ul> - каждый пользователь в своем <li>.

var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var mimeTypes = {
  ".js": "text/javascript",
  ".html": "text/html",
  ".css": "text/css"
};

http
  .createServer(function onRequest(request, response) {
    var pathname = url.parse(request.url).path;
    if (pathname == "/") pathname = "/index.html";
    var extname = path.extname(pathname);
    var mimeType = mimeTypes[extname];
    pathname = pathname.substring(1, pathname.length);

   if (extname == ".json") {
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
