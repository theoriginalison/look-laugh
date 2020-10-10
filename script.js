var searchedImage = [];
var searchedJoke = [];
var giphyPath; 
var searchJoke;
var searchJoke2pt;
var finalJoke;
var favJokeEl;
var favImgEl;
// if (searchedImage){
//   saveImage(searchedImage)
// }

// if (searchedJoke){
//   saveJoke(searchedJoke)
// }

$(".searchBtn").on("click", function() {
    // event.preventDefault();  
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
        //saving the searched image URL to local storage
        // searchedImage.push(giphyPath);
        // localStorage.setItem("searchURL", JSON.stringify(searchedImage));
        
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
