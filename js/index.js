var authorTextLength;
var quoteBuffer = [];
var usedQuotes = [];
var loadClasses = ("glyphicon glyphicon-refresh glyphicon-refresh-animate");
var isWaitingForResponse = false;
var bufferSize = 20;

$(document).ready(function() {

    authorTextLength = $("#author-text").html().length;

    updateQuote();
    $("#new-quote-btn").on("click", function() {
        $("#new-quote-btn").blur();
        if (!$("#load-icon").hasClass("glyphicon")) {
            updateQuote();
        }
    });

});

$(document).keypress(function(key){
  if(key.which == 32){
    if (!$("#load-icon").hasClass("glyphicon")) {
        updateQuote();
    }
  }

});

function updateQuote() {

    toggleLoadIcon(true);
        console.log("tweet: "+$(".twitter-share-button").html());
    if (quoteBuffer.length < 1) {
        refillBuffer(true);
    } else {
        usedQuotes.push(quoteBuffer[quoteBuffer.length - 1]);
        updateTweet(quoteBuffer[0]);
        $("#quote-text").html(quoteBuffer.shift());
        toggleLoadIcon(false);

        if(quoteBuffer.length < bufferSize){
          refillBuffer(false);
        }
    }


};

function refillBuffer(shouldUpdateQuote) {

    if (usedQuotes.length > 100) {
        usedQuotes = [];
    }

    if(!isWaitingForResponse){
      isWaitingForResponse = true;
    QuoteApi().getRandomTitleArray(function(quote) {

        isWaitingForResponse = false;
        if (shouldUpdateQuote || $("#load-icon").hasClass("glyphicon")) {
            $("#quote-text").html(quote);
            updateTweet(quote);
            $("#tweet-btn").attr("data-text", "this is a test");
            shouldUpdateQuote = false;
            toggleLoadIcon(false);
        } else {

          quoteBuffer.push(quote);
          console.log(quoteBuffer.length);
        }

        if(quoteBuffer.length < bufferSize){
          refillBuffer(false);
        }


    }, function(){
      isWaitingForResponse = false;
      refillBuffer(false);

    });
  }



};


function updateTweet(quote){
  var tweetBtn = document.querySelector(".twitter-share-button");
  var anchor = document.createElement("a");

  anchor.setAttribute("href", "https://twitter.com/share");
  anchor.setAttribute("class", "twitter-share-button");
  anchor.setAttribute("data-text", quote);
  anchor.setAttribute("id", "twitter");
  anchor.setAttribute("data-show-count", "true");
  anchor.innerHTML = "Tweet";
  tweetBtn.parentNode.replaceChild(anchor, tweetBtn);
  twttr.widgets.load();
  var html = $("#tweet-btn").html();

  console.log("html: "+html);
}




function toggleLoadIcon(showIcon) {
    var loadClasses = ("glyphicon glyphicon-refresh glyphicon-refresh-animate");
    if (showIcon) {
        $("#load-icon").addClass(loadClasses);
    } else {
        $("#load-icon").removeClass(loadClasses);

    }

};
