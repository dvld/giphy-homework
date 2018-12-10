$(document).ready(function() {

  var videoGames = [
    "The Legend of Zelda", "Super Mario", "Sonic The Hedgehog", "Halo 2", "Fallout", "Elder Scrolls", "World of Warcraft", "Grand Theft Auto", "Final Fantasy", "God of War", "Metal Gear Solid", "Bioshock", "Pokemon"
  ];

  // generate buttons
  function buttonGen(arrayUsed, classAdded, addToPage) {

    $(addToPage).empty();

    for (var i = 0; i < arrayUsed.length; i++) {

      var button = $("<button>");
      button.addClass(classAdded);
      button.attr("data-type", arrayUsed[i]);
      button.text(arrayUsed[i]);
      $(addToPage).append(button);

    }

  }

  $(document).on("click", ".game-button", function() {
    // console.log("test");
    $("#video-game-gifs").empty();
    $(".game-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=sGTy54UoD49kY7Gf52nhBFUGjRW4fFEN&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          
          var gameDiv = $("<div class='game-item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          
          var still = results[i].images.fixed_height_still.url;

          var gameImage = $("<img>");
          gameImage.attr("src", still);
          gameImage.attr("data-still", still);
          gameImage.attr("data-animate", animated);
          gameImage.attr("data-state", "still");
          gameImage.addClass("game-image");

          gameDiv.append(p);
          gameDiv.append(gameImage);

          $("#video-game-gifs").append(gameDiv);

        }

    });

  });

  $(document).on("click", ".game-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {

      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");

    } else {

      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");

    }

  });

  $("#add-game").on("click", function(event) {
    console.log("test");
    event.preventDefault();

    var newGame = $("input").eq(0).val();

    if (newGame.length > 2) {

      videoGames.push(newGame);

    }

    buttonGen(videoGames, "game-button", "#game-buttons");

  });

  buttonGen(videoGames, "game-button", "#game-buttons");

});