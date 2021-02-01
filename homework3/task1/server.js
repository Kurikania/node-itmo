// 1*. Задание на HTML, CSS, JS (Ajax) и NodeJS: Разработать сервер,
// который умеет отдавать запрашиваемые html страницы. Дана страница
// index.html. В ней есть блок #container и кнопка вне этого блока. Сделайте
// так, чтобы по нажатию на кнопку в #container ajax-ом подгружалось
// содержимое страницы ajax.html.

var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var mimeTypes = {
  ".js": "text/javascript",
  ".html": "text/html",
};

http
  .createServer(function onRequest(request, response) {
    var pathname = url.parse(request.url).path;
    if (pathname == "/") pathname = "/index.html";
    var extname = path.extname(pathname);
    var mimeType = mimeTypes[extname];
    pathname = pathname.substring(1, pathname.length);

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
  })
  .listen(8080, () => {
    console.log("on port 8080");
  });
