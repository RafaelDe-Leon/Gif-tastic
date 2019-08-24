var gifArray = ["Naruto", "Dragon Ball Z", "FullMetal Alchemist"];




document.addEventListener("DOMContentLoaded", function() {

    // target the button id #gif-find and make a AJAX call
    // $(document).ready(function() {
    $("#find-gif").on("click", function(event) {
        // stops submit button from trying to submit a form when clicked
        event.preventDefault();

        var gif = $("#gif-input")
            .val()
            .trim();

        // grab the url from giphy
        var queryURL =
            "https://api.giphy.com/v1/gifs/search?q=" +
            gif +
            "&api_key=gRAkQP0ZuZM0TiWEqZAOVsIlv71mhBqk&limit=10";

        // ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response.data);

            var imageURL = images.fixed + height_still;
            var ratingGrab = response.data.rating;

            for (var i = 0; i < response.data.length; i++) {
                $("#gif-view").preppend("<img src='" + response.data[i].response.data.imageURL + "'>");


            }

        });

        // here we grab the text inside the input box
        // gifArray.push(gif);
        // console.log(queryURL);

        // call renderButtons function
        renderButtons();
    });
    // end of ajax call

});

function renderButtons() {
    // deleting the button prior to adding new gif
    $("#create-button").empty();

    for (var i = 0; i < gifArray.length; i++) {
        // create a button for every gif search
        var buttonAdd = $("<button>");
        // add a class called gif
        buttonAdd.addClass("gif");
        // adding a data attribute
        buttonAdd.attr("data-name", gifArray[i]);
        //providing the initial button text
        buttonAdd.text(gifArray[i]);
        $("#create-button").append(buttonAdd);
    }
}


// calling the renderButtons function to display the itinial buttons
renderButtons();