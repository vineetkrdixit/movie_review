const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { Console } = require("console");


const port = "3004";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hashKey = "thisIsMyHashKey";
const jwtSecretKey = "thisIsMyJwtSecretKey";

//creating connection with database
mongoose
  .connect(
    "mongodb+srv://movieReview:qwertyuiop@moviereview.fjhgw42.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DataBase connected");
  })
  .catch((err) => {
    console.log("Failed to connect to DataBase");
  });

//Establishing a connection
const connection = mongoose.connection;

//Creating a Schema for database

const AdminDetail = new mongoose.Schema({
    email: {
      type: String,
      require: true,
    },
    phoneNo: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  });


  const MovieDetail = new mongoose.Schema({
    movieName: {
      type: String,
      require: true,
    },
    movieDetail: {
      type:String ,
      require: true,
    },
    poster: {
      type: String,
      require: true,
    },
    review:{

    }
  });

  //Creating a Model of a schema into a Database
const ADMINDETAIL = connection.model("admindetail", AdminDetail);
const MOVIEDETAIL=connection.model("moviedetail",MovieDetail)
  
//route for Admin registration
app.post("/adminregister", (req, res) => {

    console.log(req.body)
    try {
      const { phoneNo, email, password } = req.body;
      if ( !phoneNo || !email || !password ) {
        console.log("Please fill all the details");
        res.status(422).send("Please fill all the Details");
      }
    //   req.body.approvalStatus = true;
  
      //check if user exist or not
      ADMINDETAIL.findOne({ email: email }, (err, result) => {
        if (result) {
          res.send("User already exist");
        } else {
          //saving reqbody into a variable to save into database
          const values = new ADMINDETAIL(req.body);
  
          //hashing for password
          values.password = crypto
            .createHash("sha256", hashKey)
            .update(req.body.password)
            .digest("hex");
  
          //save user to database
          values.save((err) => {
            if (err) {
              res.send(err);
            } else {
              res.send("Admin Registered");
            }
          });
        }
      });
    } catch (error) {}
  });


//route for login
app.post("/login", (req, res) => {
    console.log(req.body)
    try {
      const { email, password } = req.body;
      console.log({email})
      if (!email || !password) {
        console.log("Please fill all the details");
        res.send({ message: "Please fill all the details" });
      } else {
        ADMINDETAIL.findOne({ email: email }, (err, result) => {
          if (result) {
                req.body.password = crypto
                  .createHash("sha256", hashKey)
                  .update(req.body.password)
                  .digest("hex");
  
                if (req.body.password === result.password) {
             
                  let resultpayload = {
                    result: result,
                  };
                  res.send(resultpayload);
                }
          } else {
            res.send("Invalid User");
          }
        });
      }
    } catch (error) {}
  });
  

//Routes for add Movies

//multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../public/images");
    },
    filename: (req, file, cb) => {
      console.log("========>>>>>>>>>>>>>",file);
      cb(
        null,
        Date.now() +
          path.parse(file.originalname).name +
          path.extname(file.originalname)
      );
    },
  });
  
  const upload = multer({ storage: storage });

app.post("/addmovie", (req, res) => {

    console.log(req.body)
    try {
      const { movieName, movieDetail, poster } = req.body;
      if ( !movieName || !movieDetail) {
        console.log("Please fill all the details");
        res.status(422).send("Please fill all the Details");
      }
      //check if user exist or not
      MOVIEDETAIL.findOne({ movieName: movieName }, (err, result) => {
        console.log("==========>",result)
        if (result) {
          res.send("Movie already exist");
        } else {
          //saving reqbody into a variable to save into database
          const values = new MOVIEDETAIL(req.body);
          //save user to database
          values.save((err) => {
            if (err) {
              res.send(err);
            } else {
              res.send("Movie Added Successfully");
            }
          });
        }
      });
    } catch (error) {}
  });

//   


app.get("/getallmovies", (req, res) => {
    MOVIEDETAIL.find({}, (err, result) => {
      if (result) {
        console.log("========",result)
        res.send(result);
      } else {
        res.send("Error in fetching Movies details");
      }
    });
  });

  


  app.post("/addReview", (req, res) => {

    console.log(req.body)
    try {
      const { name, email, review,_id } = req.body;
      if ( !name || !email || !review || !_id) {
        console.log("Please fill all the details");
        res.status(422).send("Please fill all the Details");
      }
      //check if user exist or not
      MOVIEDETAIL.findOne({ _id: _id }, (err, result) => {
        console.log("==========>",result)
        if (result) {
            result.review={
                name:req.body.name,
                email:req.body.email,
                review:req.body.review
            }
        }
          //saving reqbody into a variable to save into database
          const values = new MOVIEDETAIL(req.body);
          //save user to database
          values.save((err) => {
            if (err) {
              res.send(err);
            } else {
              res.send("Review Added Successfully");
            }
          });
      });
    } catch (error) {}
  });
  app.listen(port, () => {
    console.log("server started at Port: ", port);
  });
  
