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
// The in-memory database of tweets. It's a basic object with an array in it.

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

// email is taken function

function emailIsTaken(email) {
  let taken = false ;
  for (let id in users) {
    if (users[id].email == email) {
      console.log("hello" + users[id]);
      taken = true;
    }
  }
return taken;
}
// empty array for users

var users = {};

function generateRandomString() {
 var result = Math.random().toString(36).substr(2, 6);
 return result;
}

// authentication function
function authenticate(email, password) {
  for (let user_id in users) {
    let user = users[user_id];
    console.log("i am in the function",user);
    if (email === user.email) {
  if (bcrypt.compare(password === user.password)) {
    return user_id;
} else {
  return null;
   }
  }
}
  return null;
}
//end of function


app.post("/login/", (req, res) => {
let email = req.body["email"];
let password = req.body["password"];
console.log("is it working" + email);
let user_id = authenticate(email,password);
if (user_id) {
  req.session.user_id = user_id;
  res.end();
  console.log("user is logged in");
} else {
  window.alert("Email or password can not be found ")
  res.send(403, "<html><body>Wrong email or password</body></html>\n")
}
});

app.get("/login/", (req, res) => {
let email = req.body["email"];
let password = req.body["password"];
res.end();
})

app.post("/register", (req, res) => {
let email = req.body.email;
let password = bcrypt.hashSync(req.body.password, 10);
  if (!email || !password) {
    res.status(400);
    res.send("no email");
    return;
}
  if (emailIsTaken(email)) {
  res.status(400);
  res.send("email is taken");
  return;
}
const id = generateRandomString();
users[id] = {
id,
email,
password
};
req.session.username = email;
console.log(email);
console.log(users);
res.end();
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

});
