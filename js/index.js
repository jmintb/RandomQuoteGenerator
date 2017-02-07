var authorTextLength;

$(document).ready(function() {

  authorTextLength  = $("#author-text").html().length;

  updateQuote();

    $("#new-quote-btn").on("click", function() {
        updateQuote();
    });

});

function updateQuote(quote) {

    QuoteApi().getRandomTitle(function(quote) {
        console.log("quote: " + quote.length+" "+authorTextLength);

        if(quote.length+authorTextLength > 140){
          updateQuote();
        }  else {
          console.log("success: "+quote.length+" "+authorTextLength)
            $("#quote-text").html(quote);
        }

    });


};
