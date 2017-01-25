/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */





var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
}
]



$(function(){
  function renderTweets(tweets){
    for (var tweet of tweets){
    var newTweet= createTweetElement(tweet)
      $('#tweets-container').append(newTweet)
    }
  }
  renderTweets(data);

});


function createTweetElement(tweet) {
  var $tweet = $("<article>").addClass("tweet");
  var $h3 = $('<h3 class="handle">').text(tweet.user.handle)
  var $h2 = $('<h2>').text(tweet.user.name)
  var $img =$('<img>').attr("src", tweet.user.avatars.small);
  var $header = $('<header>').append($h3, $h2, $img);
  $tweet.append($header);
  var $p = $('<p>').text(tweet.content.text);
  var $body = $('<section class="tweetBody">').append($p);
  $tweet.append($body)
  var $date = $('<span class="date">').text(tweet.created_at)
  var $footer = $('<footer>').append($date);
  $tweet.append($footer)
  return $tweet;
}
