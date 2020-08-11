const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var object = {
      burgers: data,
    };
    res.render("index", object);
  });
});

router.post("/", function (req, res) {
  burger.insertOne(req.body.burger_name, function () {
    res.redirect("/");
  });
});

router.post("/:id", (req, res) => {
  var id = req.params.id;
  burger.updateOne(id, function () {
    res.redirect("/");
  });
});

module.exports = router;
