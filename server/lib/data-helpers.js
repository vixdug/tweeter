"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      try {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
      } catch (e) {
        callback(e)
      }
    },
// save users to db
    saveUser: function(user, callback) {
      try {
        db.collection("users").insertOne(user)
        .then((result) => {
          callback(null, result.insertedId);
        })
        .catch((e) => {
          callback(e)
        })
      } catch (e) {
        callback(e)
      }
  },

// get users from db // promise function to extract data
    getUsers: function(user, callback) {
      try {
      db.collection("users").findOne(user)
      .then((result) => {
        if (result == null) {
          console.log("null'n");
        } else {
        console.log(result);
        callback(null, result.email, result._id)
      }
    })
      .catch((e) => {
        callback(e)
      })
    } catch (e) {
      callback(e)
    }
},


    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    }

  };
}

//
