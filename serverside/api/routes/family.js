const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Family = require("../models/family");

router.get("/", (req, res, next) => {
  Family.find()
    .select("name nickname _id description")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        families: docs.map(doc => {
          return {
            name: doc.name,
            nickname: doc.nickname,
            _id: doc._id,
            description:doc.description,
            request: {
              type: "GET",
              url: "http://localhost:3000/family/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const family = new Family({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    nickname: req.body.nickname,
    description: req.body.description
  });
  family
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created family successfully",
        createdfamily: {
            name: result.name,
            nickname: result.nickname,
            _id: result._id,
            description: result.description,
            request: {
                type: 'GET',
                url: "http://localhost:3000/family/" + result._id
            }
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

router.get("/:familyid", (req, res, next) => {
  const id = req.params.familyid;
  Family.findById(id)
    .select('name nickname _id description')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            family: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/family'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:familyid", (req, res, next) => {
  const id = req.params.familyid;
  console.log(req.body);
  Family.update({ _id: id }, { $set: { name: req.body.name, nickname: req.body.nickname,description: req.body.description}})
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'family updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/family/' + id
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

router.delete("/:familyid", (req, res, next) => {
  const id = req.params.familyid;
  Family.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'family deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/family',
              body: { name: 'String', nickname: 'string' }
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

module.exports = router;
