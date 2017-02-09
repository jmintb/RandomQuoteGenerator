
var quoteBuffer = [];

$(document).ready(function() {

  var isWaitingForResponse = false;
  var bufferSize = 20;
  var authorTextLength;

    authorTextLength = $("#author-text").html().length;
    updateFontSize();

    updateQuote();
    updateOnBtnClicked();
    updateOnSpacebarPress();
    preventTweetBtnFromKeepingFocus();

    function updateQuote() {

      if (quoteBuffer.length < 1) {
            toggleLoadIcon(true);
            refillBuffer(true);
        } else {

            updateTweet(quoteBuffer[0]);
            $("#quote-text").html(quoteBuffer.shift());


            if (quoteBuffer.length < bufferSize) {
                refillBuffer(false);
            }
        }

        updateFontSize();


    };

    function updateOnBtnClicked(){
      $("#new-quote-btn").click( function() {
          $("#new-quote-btn").blur();
          if (!$("#load-icon").hasClass("glyphicon")) {
              updateQuote();

          }
      });
    };

    function updateOnSpacebarPress(){

      $(document).keypress(function(key) {
        if (key.which == 32) {
            if (!$("#load-icon").hasClass("glyphicon")) {
                updateQuote();
            }
        }

    });
    };

    function preventTweetBtnFromKeepingFocus(){

          $("#tweet-anchor").focus( function(){
            $("#tweet-anchor").blur();
          });
    }

    function refillBuffer(shouldUpdateQuote) {

      console.log($("#load-animation-div").hasClass("hide"));


        if (!isWaitingForResponse) {

            isWaitingForResponse = true;
            QuoteApi().getRandomQuote(function(quote) {

                isWaitingForResponse = false;
                if (shouldUpdateQuote || $("#load-animation-div").hasClass("hide") == false) {
                    toggleLoadIcon(false);
                    $("#quote-text").html(quote);
                    updateTweet(quote);
                    shouldUpdateQuote = false;
                    updateFontSize();


                } else {
                    toggleLoadIcon(false);
                    quoteBuffer.push(quote);
                    console.log(quoteBuffer.length);

                }

                if (quoteBuffer.length < bufferSize) {
                    refillBuffer(false);
                }


            }, function() {
                isWaitingForResponse = false;
                refillBuffer(false);

            });
        }



    };


    function updateTweet(quote) {

        var tweetBtn = document.querySelector(".twitter-share-button");
        var quoteFiltered = quote.replace("—", "-");
        $("#tweet-anchor").attr("href", "http://twitter.com/share?text="+String(quoteFiltered)+" -  Donald J Trump");

    }



    function toggleLoadIcon(showIcon) {
        if (showIcon) {
            $("#load-animation-div").removeClass("hide");
        } else {
            $("#load-animation-div").addClass("hide");

        }

    };


});

function updateFontSize(){
  $("#quote-container").textfill({
    success: function(){
      console.log("resize succes");
    },
    fail: function(){
      console.log("resize failed");

    }
  });
}


$(window).resize(updateFontSize);
