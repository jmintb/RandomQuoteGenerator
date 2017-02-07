var QuoteApi = function(){



var qa = {};
var API_URL = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";


qa.getRandomTitle = function(success, error){

  var result =  $.get(API_URL, function(data, status){
    console.log("result: "+data.message);
    return data;
  });



};
return qa;

};
