const http = require("http"); // подключение модуля
const server = http.createServer((request, response) => {
  // вызов метода создания http сервера
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("<h1>Hello</h1>");
  response.end();
  console.log("HTTP works!");
});
server.listen(8080);
