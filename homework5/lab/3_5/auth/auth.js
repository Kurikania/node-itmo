let express = require("express"); //подключаем модуль express
let router = express.Router(); //создаем новый роутер

router.get("/", (req,res) => {
  res.render('auth');
})

router.post("/enter", (req, res) => {
  console.log(JSON.stringify(req.body.username))
  res.render('index', { title: JSON.stringify(req.body.username)});
});

module.exports = router;

// Задача 5.
// Получите данные из POST формы (продолжение задачи 3) и сгенерируйте 
// HTML шаблон уведомления о регистрации с помощью шаблонизатора mustache (по аналогии описанной в задача 4).