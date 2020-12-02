const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

//create
exports.create = (req,res) =>{
    //validate request
    if(!req.body.title){
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }

    //create post
    const post = {
        title:req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Post.create(post)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error occured while creating the post"
            })
        });
};

//retrieve all
exports.findAll = (req,res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Post.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error occured while find post"
            })
        });
};

//find single 
exports.findOne = (req,res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then((data) => {
            if(data != null){
                res.send(data);
            }else{
                res.status(404).send({
                    message:
                        "no data = " + id
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "error retrieving post with id=" + id
            })
        });
};

//update a post with id
exports.update = (req,res) => {
    const id = req.params.id;

    Post.update(req.body,{
        where: {id: id}
    }).then((result) => {
        if ( result == 1 ){
            res.send({
                message: "Post was updated successfully"
            })
        }else{
            res.send({
                message: `cannot update Post with id=${id}.`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error updating post with id=" + id
        })
    })
}

//delete a post
exports.delete = (req,res) => {
    const id = req.params.id;

    Post.destroy({
        where: {id: id}
    }).then((result) => {
        if ( result == 1 ){
            res.send({
                message: "Post was deleted successfully"
            })
        }else{
            res.send({
                message: `cannot deleted Post with id=${id}.`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error deleted post with id=" + id
        })
    })
}

//delete all post 
exports.deleteAll = (req,res) => {
    Post.destroy({
        where: {},
        truncate: false
    }).then((result) => {
        res.send({
            message: `${result} Post was deleted successfully`
        })
    }).catch((err) => {
        res.status(500).send({
            message: "Some error occured while removing all posts."
        })
    })
}

//find all published
exports.findAllPublished = (req,res) => {
    Post.findAll({
        where: {published: true}
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "some error occured while find post"
        })
    });
}