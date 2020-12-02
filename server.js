const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//models
const db = require("./app/models");

const app = express();

let whiteList = [
    'http://localhost:80',
]
let corsOption = {
    origin: function (origin, callback){
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error('Not allowed bby CORS'));
        }
    }
};

app.use(cors(corsOption));

//parse request of content-type - application/json
app.use(bodyParser.json());

//parse request application/json x-www-form-urlencode
app.use(bodyParser.urlencoded({exteded:true}));

//sync database
db.sequelize.sync();

//simple route
app.get('/',(req,res) =>{
    res.json({
        message: "Welcome to ExMySQL"
    })
})

// Posts Routes
require("./app/routes/post.routes")(app);

//set port, listen for request
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});