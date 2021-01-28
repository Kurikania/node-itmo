const http = require("http"); // подключение модуля http
const fs = require("fs"); // подключение модуля для работы с файлом
let file = ""
const files = ["header.html", "footer.html","body.html" ]
http.createServer((request, response) => {
   function read (filename) {
       fs.readFile(filename, "utf8", (err, data) => {
          if (err) {
            console.log("Could not find or open file for reading\n");
            response.statusCode = 404;
            response.end();
          } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            file += data
        }
    });
}
files.forEach(read)
    response.end(file);
    console.log("Request accepted!");
    file = ""; 
  })
  .listen(8080, () => {
    console.log("HTTP server works in 8080 port!\n");
  });

//   1. Сделайте три файла header.html , body.html, footer.html с простой html версткой 
//и отдайте контент за один вызов сервера.
