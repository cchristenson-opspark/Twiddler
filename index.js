
window.onbeforeunload = function () {
  window.scrollTo(0,0);
};

$(document).ready(() => {
  jQuery("time.timeago").timeago();
  const $body = $('body');
  //$body.html('');
  $body.append('<div id="feed" class="feed"></div>')
  let i = streams.home.length - 1;
  newT(streams.home);
  function newT(arr){
    $("#feed").empty();
    let i = arr.length - 1;
    while (i >= 0){
      const tweet = arr[i]
      const $tweet = $('<div id="tweet" class="tweet"></div>');
      if(Object.keys(streams.users).includes(tweet.user)){
        $tweet.append(`<img src="pix/${tweet.user}.jpg" class="avatars" height="70" width="70"/>`)
      } else {
        $tweet.append(`<img src="pix/you.jpg" class="avatars" height="70" width="70"/>`)
      }
      $tweet.append(`<h2 id="userName" class="userName${tweet.user}">@${tweet.user}:</h2>`)
      $tweet.append(`<div id="twiddle" class="twiddle"> ${tweet.message} </div>`)
      $tweet.append('<div id="timeAgo" class="timeStamp">' + jQuery.timeago(tweet.created_at) + "</div>")
      $tweet.appendTo("#feed")
      i -= 1;

      $('.userName' + tweet.user).on('click', function () {
        return newT(streams.users[tweet.user])
      })
    }
  }
  const $getTwid = $('#newTwiddles').click(() => {
    newT(streams.home)
  });
  const $youTwid = $('#post-button').click(() =>{
    window.visitor = ($("#you-name").val())
    if(streams.users[window.visitor] === undefined){
      streams.users[window.visitor] = []; 
    }
    writeTweet($("#you-twiddle").val())
    newT(streams.home);
  })
});
