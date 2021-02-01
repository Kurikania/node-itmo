let langSpace = process.argv[2];
console.log(langSpace)
let http = require("http"); 
let fs = require("fs"); // подключение модуля для работы с файлом
const server = http.createServer((request, response) => {
    //let langSpace = process.env.LANG
    response.writeHead(200, { "Content-Type": "text/html" });
    if (langSpace.includes("en")){ 
        pathname = "pages/en.html";
    } else {
        pathname = "pages/ru.html";
    }
    let data = fs.readFileSync(pathname);
    response.end(data);
  });
  server.listen(8080, () => {
      console.log("Listening on 8080")
  });

  