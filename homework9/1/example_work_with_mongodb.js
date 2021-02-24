var mongoClient = require("mongodb").MongoClient;
// Строка подлючения
var url = "mongodb://localhost:27017/test";
// Подключение
mongoClient.connect(url, function (err, dbs) {
  if (err) {
    return console.log(err);
  }
  // взаимодействие с базой данных
  console.log("Подключились к базе данных!");
  var db = dbs.db("test");
  var collection = db.collection("users");
  //   var user = { name: "Sasha", age: 32 };
  //   collection.insertOne(user, function (err, result) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log(result.ops);
  //     var users = [
  //       { name: "Bob", age: 34 },
  //       { name: "Alice", age: 21 },
  //       { name: "Tom", age: 45 },
  //     ];
  //     collection.insertMany(users, function (err, result) {
  //       if (err) {
  //         return console.log(err);
  //       }
  //       console.log(result.ops);
  //       dbs.close();
  //     });
  //   });
  db.collection("users")
    .find()
    .toArray(function (err, results) {
      console.log("- поиск без параметров:");
      console.log(results);
      dbs.close();
    });

  db.collection("users")
    .find({ name: "Tom" })
    .toArray(function (err, results) {
      console.log("- поиск с параметрами:");
      console.log(results);
      dbs.close();
    });

  db.collection("users").deleteMany({ name: "Tom" }, function (err, result) {
    console.log(" - множественное удаление по условию:");
    console.log(result);
    dbs.close();
  });
  db.collection("users").updateMany(
    { name: "Sam" }, // критерий фильтрации
    { $set: { name: "Bob" } }, // параметр обновления
    function (err, result) {
      console.log(" - множественное обновление:");
      console.log(result);
      dbs.close();
    }
  );
});
