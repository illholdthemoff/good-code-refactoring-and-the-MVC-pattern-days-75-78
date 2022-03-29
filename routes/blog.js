const express = require("express");

const blogController = require("../controllers/post-controller");
// const { updatePost } = require("../controllers/post-controller");
const guardRoute = require("../middlewares/auth-protection-middleware");

const router = express.Router();

router.get("/", blogController.getHome);

router.use(guardRoute);// this will be used as the first middleware by default on all things below it, so after the filter (/admin /posts) it will then run this, and if it succeeds it will then run the page retrieval. Not used on getHome because that should be available to all logged in or not

router.get("/admin", blogController.getAdmin); 

router.post("/posts", blogController.createPost);

router.get("/posts/:id/edit", blogController.getSinglePost);

router.post("/posts/:id/edit", blogController.updatePost);

router.post("/posts/:id/delete", blogController.deletePost);

module.exports = router;
