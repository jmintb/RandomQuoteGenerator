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

    if (quoteBuffer.length < 1) {
        refillBuffer(true);
    } else {
        usedQuotes.push(quoteBuffer[quoteBuffer.length - 1]);
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




function toggleLoadIcon(showIcon) {
    var loadClasses = ("glyphicon glyphicon-refresh glyphicon-refresh-animate");
    if (showIcon) {
        $("#load-icon").addClass(loadClasses);
    } else {
        $("#load-icon").removeClass(loadClasses);

    }

};
