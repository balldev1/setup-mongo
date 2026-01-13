const express = require("express");
const router = express.Router();
const controller = require("../controllers/store.controller");

router.post("/getLocation", controller.getLocation);
router.post("/createStore", controller.createStore);
// router.post("/encryData", controller.encry);

module.exports = router;
