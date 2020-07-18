const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
        const object = {
            burgers: data
        };
        res.render("index", object);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.create([
        "name", "devour"
    ], [
        req.body.name, req.body.devour
    ], function(result) {
        res.json({id: result.insertID});
    });
});

router.put("/api/burgers/:id", function(req, res) {
    const condition = 'id = ' + req.params.id;
    burger.update({
        devour: req.body.devour
    }, condition, function(result) {
        if (result.changedRows == 0) {
            console.log("404");
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    const condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;