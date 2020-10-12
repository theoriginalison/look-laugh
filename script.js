var searchedImage = [];
var searchedJoke = [];
var giphyPath; 
var searchJoke;
var searchJoke2pt;
var finalJoke;
var favJokeEl;
var favImgEl;
var catImgEl;
var noJoke = ["Hmmmm. Sorry, that's not really funny, try again.", "I don't like that idea... try again", "No one is here to take your request", "Back in 10min... try again", "We're on corney joke strike... try again", "Some things in life are not worth searching for... try again", "I searched high and low... no", "No... try again", "I couldn't find it, but you found me. Thanks for the company. Try again."]
var catArray = [100, 200, 204, 206, 303, 400, 401, 403, 404, 406, 409, 412, 416, 417, 418, 420, 421, 422, 429, 444, 450, 500, 502, 503, 508, 599];


// =================================================================
$(window).on("load",function() {
searchedImage = JSON.parse(localStorage.getItem("searchURL")) || [];
// console.log(searchedImage)
searchedJoke = JSON.parse(localStorage.getItem("searchJoke")) || [];

for (var i = 0; i < searchedImage.length; i++) {
  favImgEl = $("<img>").attr("src", searchedImage[i]);
  $("#favorites").empty();

  $("#favDiv").prepend(favImgEl);
}
for (var i = 0; i < searchedJoke.length; i++) {
  favJokeEl = $("<textarea>");
  $("#favorites").empty();
  favJokeEl.val(searchedJoke[i]);

  $("#favDiv").prepend(favJokeEl);
  }
})
// =================================================================

$(".searchBtn").on("click", function() {
    // event.preventDefault();  
    $(".cat").empty();

    var usersInput = $("input").val();
    console.log(usersInput);
    var APIKey = "exe1mRjrNORY4JZqVFCNFzS1XTPTrMfu";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + usersInput + "&api_key=" + APIKey + "&limit=1";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        console.log(queryURL);
        console.log(response.data[0].url);
        giphyPath = response.data[0].images.original.url;
        
        var divEl = $(".giphyImg");
        var imgEl = $("<img>");
        imgEl.attr("src", giphyPath);
        
        divEl.empty()
        divEl.prepend(imgEl);

        // console.log(response.)

      });
  }); 

  $("#saveImage").on("click", function(){
    saveImage(searchedImage)
  });

  function saveImage(searchedImage) {
    var favImgEl = $("<img>");

    searchedImage.push(giphyPath);

    console.log(searchedImage)
    localStorage.setItem("searchURL", JSON.stringify(searchedImage));
    for (var i = 0; i < searchedImage.length; i++) {
      searchedImage = JSON.parse(localStorage.getItem("searchURL"));

      favImgEl.attr("src", searchedImage[i]);
      $("#favorites").empty();

      $("#favDiv").prepend(favImgEl);
    }

  };
  
  
  $(document).on('click', '.searchBtn', function(event) {
    event.preventDefault();  
    var usersInput = $("input").val()
    console.log(usersInput)
    var queryURL = "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&contains="+ usersInput;
    console.log(queryURL)
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);
    console.log(response.setup);
    console.log(response.delivery);
    console.log(response.joke);
    responseJ = response.setup;
    // Transfer content to HTML
    if (response.setup == undefined) {

      $("#jokes").val(response.joke);

      searchJoke = response.joke;
      console.log(searchJoke);
      finalJoke = searchJoke;
      //saving the searched image URL to local storage
      // searchedJoke.push(searchJoke);
      // localStorage.setItem("searchJoke", JSON.stringify(searchedJoke));
    }
    else {
      $("#jokes").val(response.setup + "    "  + response.delivery)
      
      searchJoke2pt = response.setup + "    "  + response.delivery;
      console.log(searchJoke2pt);
      finalJoke = searchJoke2pt;
      //saving the searched image URL to local storage
      // searchedJoke.push(searchJoke2pt);
      // localStorage.setItem("searchJoke", JSON.stringify(searchedJoke));
    }

    if (searchJoke == undefined && response.setup == undefined) {
      var noJoketArrayIndex = Math.floor((Math.random() * noJoke.length) + 1);
      $("#jokes").val(noJoke[noJoketArrayIndex]);

      var catArrayIndex = Math.floor((Math.random() * catArray.length) + 1);
      var catURL = "https://http.cat/"+catArray[catArrayIndex];
       catImgEl = $("<img>");
       catImgEl.attr("src", catURL);
      $(".cat").empty();

      $(".cat").append(catImgEl);

    }
  });
  
  });

  $("#saveJoke").on("click", function(){
    saveJoke(searchedJoke)
  })

    function saveJoke(searchedJoke){
    var favJokeEl = $("<textarea>");
    searchedJoke.push(finalJoke);
    localStorage.setItem("searchJoke", JSON.stringify(searchedJoke));

    for (var i = 0; i < searchedJoke.length; i++) {
    searchedJoke = JSON.parse(localStorage.getItem("searchJoke"));

    $("#favorites").empty();
    favJokeEl.val(searchedJoke[i]);

    $("#favDiv").prepend(favJokeEl);
    }
    }

    $("#clearFavorites").on("click", function(){
      localStorage.clear();
      $("#favDiv").empty()
    })
