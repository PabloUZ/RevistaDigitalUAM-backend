const express = require("express");
const router = express.Router();


const controller = require("../controllers/article");

router.post("/articles/post", controller.POST);
router.get("/articles/getall", controller.GETALL);
router.get("/articles/get/:id", controller.GET);
router.delete("/articles/delete/:id", controller.DELETE);
router.put("/articles/update-status/:id", controller.UPDATE_STATUS);
router.get("/articles/getFile/:filename", controller.GETFILE);


module.exports = router;