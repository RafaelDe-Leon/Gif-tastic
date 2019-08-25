$(document).ready(function() {
  // var that holds preloaded Gifs array
  renderButtons(gifArray, "searchButton margin-control", "#create-button");
  console.log("Page has Loaded");
});

var gifArray = ["Naruto", "Dragon Ball Z", "FullMetal Alchemist"];

function renderButtons(gifArray, classToAdd, areaToAddTo) {
  // deleting the button prior to adding new gif
  $(areaToAddTo).empty();

  for (var i = 0; i < gifArray.length; i++) {
    // create a button for every gif search
    var buttonAdd = $("<button>");
    // add a class called gif
    buttonAdd.addClass(classToAdd);
    // adding a data attribute
    buttonAdd.attr("data-name", gifArray[i]);
    //providing the initial button text
    buttonAdd.text(gifArray[i]);
    $(areaToAddTo).append(buttonAdd);
  }
}

$(document).on("click", ".searchButton", function() {
  var dataName = $(this).data("name");
  console.log("this type is: " + dataName);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    dataName +
    "&api_key=gRAkQP0ZuZM0TiWEqZAOVsIlv71mhBqk&limit=10";

  //   ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.data);
    //   for loop to go through the response data.
    for (var i = 0; i < response.data.length; i++) {
      var searchDiv = $("<div class='search-item'>");
      //grab the rating from ajax call
      var rating = response.data[i].rating;
      //create p tag with rating in it
      var p = $("<p>").text("Rating: " + rating);
      //grab animated gif from response.data
      var animated = response.data[i].images.fixed_height.url;
      //grab still gif from response.data
      var still = response.data[i].images.fixed_height_still.url;
      //create img
      var image = $("<img>");
      //add attribute src still
      image.attr("src", still);
      //add data of still
      image.attr("data-still", still);
      //add data of animated
      image.attr("data-animated", animated);
      /// add attribute of data state
      image.attr("data-state", "still");
      //add class of searchImage
      image.addClass("searchImage");
      //append p to search div
      searchDiv.append(p);
      // add image to search div
      searchDiv.append(image);
      //append the search div to gif-dump div
      $("#gif-dump").prepend(searchDiv);
    }
  });
});

$(document).on("click", ".searchImage", function() {
  var state = $(this).attr("data-state");
  if (state == "still") {
    $(this).attr("src", $(this).data("animated"));
    $(this).attr("data-state", "animated");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
});

$("#newButton").on("click", function() {
  event.preventDefault();

  var newSearch = $("input")
    .eq(0)
    .val();
  gifArray.push(newSearch);
  renderButtons(gifArray, "searchButton margin-control", "#create-button");
});

//   function divDump() {
//     $("#gif-dump").on("click", function() {

//       var imageURL = images.fixed_height_still;
//       var ratingGrab = response.data.rating;

//       for (var i = 0; i < response.data.length; i++) {
//         $("#gif-view").preppend(
//           "<img src= '" + response.data[i].response.data.imageURL + "'>"
//         );
//       }
//     });
//   }

//   divDump();

//   // calling the renderButtons function to display the itinial buttons
//   renderButtons();
// };

//   //click event for adding buttons when gif input is pressed

//   $("#gif-submit").on("click", function(event) {
//     // stops submit button from trying to submit a form when clicked
//     event.preventDefault();

//     var gif = $("#gif-input")
//       .val()
//       .trim();

//     // grab the url from giphy
//

//
//     // here we grab the text inside the input box
//     // gifArray.push(gif);
//     // console.log(queryURL);

//     // call renderButtons function
//     renderButtons();
