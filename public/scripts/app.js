
$(function(){
  function renderTweets(tweets){
    $('#tweets-container').empty();
    for (var tweet of tweets){
    var newTweet= createTweetElement(tweet)
      $('#tweets-container').prepend(newTweet)
    }
  }

  loadTweets()

function getDaysAgo(b){
  var seconds = Math.floor((new Date() - b) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years ago";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months ago";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days ago";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours ago";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago"
}


function createTweetElement(tweet) {
  var newdate = getDaysAgo(tweet.created_at)
  var $tweet = $("<article>").addClass("tweet");
  var $h3 = $('<h3 class="handle">').text(tweet.user.handle)
  var $h2 = $('<h2>').text(tweet.user.name)
  var $img =$('<img>').attr("src", tweet.user.avatars.small);
  var $header = $('<header>').append($h3, $h2, $img);
  $tweet.append($header);
  var $p = $('<p>').text(tweet.content.text);
  var $body = $('<section class="tweetBody">').append($p);
  $tweet.append($body)
  var $date = $('<span class="date">').text(newdate)
  var $icons = $('.icons')
  var $icons1 = $('<i class="fa fa-retweet" aria-hidden="true"></i>')
  var $icons2 = $('<i class="fa fa-heart" aria-hidden="true"></i>')
  var $icons3 = $('<i class="fa fa-flag" aria-hidden="true"></i>')

  var $footer = $('<footer>').append($date, $icons, $icons1, $icons2, $icons3)
  $tweet.append($footer)
  return $tweet;
}

  $('#tweet-form').on('submit', function (event) {
    event.preventDefault();
    $.ajax ({
      url: "/tweets/",
      method: 'post',
      data: $(this).serialize(),
      success: function(result){
      $('textarea').val('')
      loadTweets()
      $('.counter').text('140')
      }
    })
  });


  $('.popupForm').on('submit', function (event) {
    event.preventDefault();
    $.ajax ({
      url: "/login",
      method: 'post',
      data: $(this).serialize(),
      success: function(result){
        console.log("sucessful AJAX POST")
      $('#name').val('')
      $('#password').val('')
    }
  });
})



  $('.logoutForm').on('submit', function (event) {
    event.preventDefault();
    $.ajax ({
      url: "/logout",
      method: 'post',
      success: function(result){
        console.log("sucessful LOGOUT through ajax")
    }
  });
})



$('.regForm').on('submit', function (event) {
  event.preventDefault();
  $.ajax ({
    url: "/register",
    method: 'post',
    data: $(this).serialize(),
    success: function(result){
    $('#regName').val('')
    $('#regPassword').val('')
  }
});
})


function loadTweets(){
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (loadedTweets) {
        renderTweets(loadedTweets)
      }
    })
  }

// toggle animation jquery

$(".register-btn").click(function(){
  $(".registration-form").slideToggle("slow")
});

  $(".login-btn").click(function(){
    $(".login-form").slideToggle("slow")
  });

$(".compose").click(function(){
  $(".new-tweet").hide().slideDown("slow")
  $("textarea").focus();
  })



// end of document ready
});
