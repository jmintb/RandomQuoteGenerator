var QuoteApi = function() {

    var qa = {};
    var API_URL = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

    qa.getRandomTitle = function(success, error) {
        $.get(API_URL, function(data, status) {
            success(data.message);
        });
    };
    return qa;
};
