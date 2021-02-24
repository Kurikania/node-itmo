const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const cors = require("cors")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(cors())

// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/teamwork_todos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err));



const todos = require("./routes/todo")
app.use('/api/todos', todos); 


// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})



// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});