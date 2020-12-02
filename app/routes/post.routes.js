module.exports = app => {
    const posts = require("../controllers/post.controller.js");

    let router = require("express").Router();

    // Create a new post
    router.post("/", posts.create);

    // Retrieve all posts
    router.get("/", posts.findAll);

    // Retrieve publish posts
    router.get("/published", posts.findAllPublished);

    // Retrieve single posts
    router.get("/:id", posts.findOne);

    // Retrieve single posts
    router.put("/:id", posts.update);

    //delete post
    router.delete("/:id", posts.delete);

    //delete all
    router.delete("/", posts.deleteAll);


    app.use("/api/posts", router);
}