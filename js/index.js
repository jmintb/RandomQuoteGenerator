
$(document).ready(function(){


$("#new-quote-btn").on("click", function(){
  console.log("test");

  printTitle();
});




});
function printTitle(){

  QuoteApi().getRandomTitle(function(title){
    console.log("title: "+title[0]);
  },
   function(msg){
    console.log(msg);
  });

};
