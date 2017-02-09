
var quoteBuffer = [];

$(document).ready(function() {

  var isWaitingForResponse = false;
  var bufferSize = 20;
  var authorTextLength;

    authorTextLength = $("#author-text").html().length;

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
            console.log("tweet clicked");
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
        console.log("filtered: "+quoteFiltered+"  "+quote);
        $("#tweet-anchor").attr("href", "http://twitter.com/share?text="+String(quoteFiltered)+" -  Donald J Trump");
        console.log("update twitter btn");

    }




    function toggleLoadIcon(showIcon) {
        console.log("showIcon: "+showIcon);
        if (showIcon) {
            $("#load-animation-div").removeClass("hide");
        } else {
            $("#load-animation-div").addClass("hide");

        }

    };


});
