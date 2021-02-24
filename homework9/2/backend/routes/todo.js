const express = require("express");
const router = express.Router(); 
const Todos = require("../model/todos")

router.get("/", (req, res, next ) => {
    Todos.find()
    .then((todos) => {
        console.log(todos)
        res.json(todos)
    })
    .catch(err => console.log(err));
    
})

router.post("/add", (req, res, next) => {
    console.log(req.body)
    const isDone = req.body.isDone; 
    const body = req.body.body
    const newTodos = new Todos({
        isDone: isDone, 
        body: body
    });
    newTodos.save() 
    .then(todo => {
        res.json(todo);
    })
    .catch( err => console.log(err))
})

router.put("/update", (req, res, next) => {
    let id = req.body._id
    Todos.findById(id)
    .then( todo => {
        todo.isDone = req.body.isDone        
        todo.save()
        .then(todo => {
            res.send({
                message: "todo updated", 
                status: "success", 
                todo: todo
            })
        })
        .catch(err => console.log(err))
    })
})

router.delete("/delete/:id", (req,res, next) => {
    console.log(req.params.id)
    Todos.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: data
          })
          console.log(Todos.find())
        }
    })
})


module.exports = router