
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
        var giphyPath = response.data[0].images.original.url;
        //saving the searched image URL to local storage
        localStorage.setItem("searchURL", giphyPath);
        
        var divEl = $(".giphyImg");
        var imgEl = $("<img>");
        imgEl.attr("src", giphyPath);

        divEl.empty()
        divEl.prepend(imgEl);

        // console.log(response.)
      });
  }); 

  $("#saveImage").on("click", function(){
    var favImgEl = $("<img>");
    var searchedImage = localStorage.getItem("searchURL");

    favImgEl.attr("src", searchedImage);
    $("#favorites").empty();

    $("#favDiv").prepend(favImgEl);
  })

  $("#saveJoke").on("click", function(){
    var favJokeEl = $("<textarea>");
    var searchedJoke = localStorage.getItem("searchJoke");

    $("#favorites").empty();
    favJokeEl.val(searchedJoke);

    $("#favDiv").prepend(favJokeEl);
  })
  
  $(document).on('click', '.searchBtn', function(event) {
    event.preventDefault();  
    var usersInput = $("input").val()
    console.log(usersInput)
    var queryURL = "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=racist,sexist&contains="+ usersInput;
    console.log(queryURL)
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);
    console.log(response.setup);
    console.log(response.delivery);
    console.log(response.joke);
    
    // Transfer content to HTML
    if (response.setup == undefined) {

      $("#jokes").val(response.joke);

      var searchJoke = response.joke;
      console.log(searchJoke);
      //saving the searched image URL to local storage
      localStorage.setItem("searchJoke", searchJoke);
    }
    else {
      $("#jokes").val(response.setup + "    "  + response.delivery)
      
      var searchJoke2pt = response.setup + "    "  + response.delivery;
      console.log(searchJoke2pt);
      //saving the searched image URL to local storage
      localStorage.setItem("searchJoke", searchJoke2pt);
    }
  });
  
  });