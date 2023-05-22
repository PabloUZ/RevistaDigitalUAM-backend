const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");

router.post("/users/post", controller.POST);
router.get("/users/getall", controller.GETALL);
router.get("/users/get/:id", controller.GET);



module.exports = router;