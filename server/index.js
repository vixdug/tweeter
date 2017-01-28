"use strict";
require('dotenv').config();
const bcrypt = require('bcrypt');
var cookieSession = require('cookie-session');


// Basic express setup:

const PORT          = process.env.PORT || 5000;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;


MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  keys: ['Lighthouse Labs'],
}));


const DataHelpers = require("./lib/data-helpers.js")(db);

// The `tweets-routes` can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

// email is taken function

function emailIsTaken(email) {
  let taken = false ;
  for (let id in users) {
    if (users[id].email == email) {
      taken = true;
    }
  }
return taken;
}
// empty array for users


// function generateRandomString() {
//  var result = Math.random().toString(36).substr(2, 6);
//  return result;
// }

// authentication function
// function authenticate(email, password) {
//   for (let user_id in users) {
//     let user = users[user_id];
//     if (email === user.email) {
//   if (bcrypt.compare(password === user.password)) {
//     return user_id;
// } else {
//   return null;
//    }
//   }
// }
//   return null;
// }
//end of function


//log in POST
app.post("/login/", (req, res) => {
let email = req.body["email"];
let password = bcrypt.hashSync(req.body.password, 10);
const searchUser = {
  "email": email
}
console.log(searchUser);
  DataHelpers.getUsers(searchUser,(err, email, id) => {
    console.log(email);
    console.log(id);
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
          if (email === req.body['email']) {
          req.session.username = id;
          res.status(201).send();
          res.end();
          console.log("user is logged in");
        } else {
          res.status(400).json({ error: err.message });
        }
      }
    })
  res.end();
})



//logout POST

app.post("/logout", (req, res) => {
req.session = null;
res.end();
console.log("logged out");

});

app.get("/logout", (req, res) => {
  res.status(200)
  res.end();

})

app.get("/login/", (req, res) => {
  let email = req.body["email"];
  let password = req.body["password"];
  res.end();

});


app.post("/register", (req, res) => {
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, 10);
  if (!email || !password) {
    res.status(400);
    res.send("no email");
    return;
  }

  const user = {
    email,
    password
  };
  DataHelpers.saveUser(user, (err, userId) => {
    console.log("the real user id is", userId);
    if (err){
      res.status(500).json({ error: err.message });
      res.end();
    } else {
      req.session.username = userId
      res.status(201).send();
      res.end();
  }
});

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

});
