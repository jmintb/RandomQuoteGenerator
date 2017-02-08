var QuoteApi = function() {

    var qa = {};
    var API_URL = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

    qa.getRandomTitle = function(success) {
        $.get(API_URL, function(data, status) {
            success(data.message);
        });
    };

    qa.getRandomTitleArray = function(success){

      for(var i = quoteBuffer.length; i < 100; i++){
        $.get(API_URL, function(data, status) {
          if(data.message.length>111 || quoteBuffer.indexOf(data.message) !== -1 || usedQuotes.indexOf(data.message) !== -1){
            i--;
          }else {

            success(data.message)


          }
        });
      };

    };


    return qa;
};
