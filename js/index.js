var authorTextLength;
var quoteBuffer = [];
var usedQuotes = [];
var loadClasses = ("glyphicon glyphicon-refresh glyphicon-refresh-animate");

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

function updateQuote() {
    console.log("update quote")
    toggleLoadIcon(true);

    if (quoteBuffer.length < 1) {
        refillBuffer(true);
    } else {
        usedQuotes.push(quoteBuffer[quoteBuffer.length - 1]);
        $("#quote-text").html(quoteBuffer.pop());
        toggleLoadIcon(false);

        if(quoteBuffer.length < 20){
          refillBuffer(false);
        }
    }
};

function refillBuffer(shouldUpdateQuote) {

    if (usedQuotes.length > 100) {
        usedQuotes = [];
    }

    console.log("refillBuller: " + quoteBuffer.length);

    QuoteApi().getRandomTitleArray(function(quote) {
        if (shouldUpdateQuote || $("#load-icon").hasClass("glyphicon")) {
            $("#quote-text").html(quote);
            shouldUpdateQuote = false;
            toggleLoadIcon(false);
        } else {
          console.log("push: "+quoteBuffer.length);
          quoteBuffer.push(quote);
        }


    });

};




function toggleLoadIcon(showIcon) {
    var loadClasses = ("glyphicon glyphicon-refresh glyphicon-refresh-animate");
    if (showIcon) {
        $("#load-icon").addClass(loadClasses);
    } else {
        $("#load-icon").removeClass(loadClasses);

    }

};
