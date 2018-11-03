const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Todo = require("../models/todo");
const Family = require("../models/family");


// Handle incoming GET requests to /family
router.get("/", (req, res, next) => {
  Todo.find()
    .select("familymember createdat _id description")
    .populate('familymember', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        todos: docs.map(doc => {
          return {
            _id: doc._id,
            familymember: doc.familymember,
            createdat: doc.createdat,
            description: doc.description,
            request: {
              type: "GET",
              url: "http://localhost:3000/todo/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  Family.findById(req.body.familyid)
    .then(family => {
      if (!family) {
        return res.status(404).json({
          message: "family not found"
        });
      }
      const todo = new Todo({
        _id: mongoose.Types.ObjectId(),
        familymember: req.body.familyid,
        description: req.body.description,
        createdat: new Date(Date.now()).toLocaleString()
      });
      return todo.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "todo stored",
        createdtodo: {
          _id: result._id,
          familymember: result.familymember,
          description: result.description,
          createdat: result.createdat
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/todo/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:todoid", (req, res, next) => {
  Todo.findById(req.params.todoid)
    .populate('familymember')
    .exec()
    .then(todo => {
      if (!todo) {
        return res.status(404).json({
          message: "todo not found"
        });
      }
      res.status(200).json({
        todo: todo,
        request: {
          type: "GET",
          url: "http://localhost:3000/todo"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:todoid", (req, res, next) => {
  Todo.remove({ _id: req.params.todoid })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "todo deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/todo",
          body: { familymember: "ID", description: "String" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
