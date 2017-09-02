$(document).ready(function() {

    var gifs = ['Godzilla', 'Jesus', 'Morgan Freeman', 'sun', 'dinosaurs' ];

        function displayGiphy() {
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&api_key=5a3bb5dd2a3847afba0ee3a8814db9e5&limit=10';

            $.ajax({
                url: queryURL,
                method: "GET",
            }).done(function(response) {

            console.log(response);

                    for (var i = 0; i < response.data.length; i++) {
                    
                        var gifDiv = $('<div>');
                        gifDiv.attr('class', 'gif-div');
                        var gifImg = $('<img>');
                        gifImg.attr('class', 'gifImg img-fluid');
                        gifImg.attr('data-state', 'still');
                        gifImg.attr('data-still', response.data[i].images.fixed_height_still.url);
                        gifImg.attr('data-animate', response.data[i].images.fixed_height.url);
                        imageUrl = response.data[i].images.downsized_still.url;
                        console.log('still: ' + imageUrl);
                        gifImg.attr('src', imageUrl);
                        var rating = $('<p>').html('Rating: ' + response.data[i].rating);
                        rating.attr('class', 'rating');
                        gifDiv.append(gifImg);
                        gifDiv.append(rating);
                        $('#giphy-area').append(gifDiv);
                    }
            });

        } // display giphy, to the right of the buttons
    
            function renderButtons() {

                $('#button-area').empty();

                for (var j = 0; j < gifs.length; j++) {
                    var gifButton = $('<button>');
                    gifButton.addClass('gif btn btn-dark btn-lg btn-block');
                    gifButton.attr('data-name', gifs[j]);
                    gifButton.text(gifs[j]);
                    $('#button-area').append(gifButton);
                }
                
            } // render buttons, i guess

            $('#search-btn').on('click', function(event) {
                event.preventDefault();       
                gif = $('#giphy-search').val().trim(); 
                gifs.push(gif);
                $('#giphy-search').val('');
                renderButtons();
            });

            $(document).on('click', '.gif', function(e) {
                e.preventDefault;  
                $('#giphy-area').empty();                            
                gif = $(this).attr('data-name');
                console.log('gif: ' + gif);
                displayGiphy();
            });


            $(document).on('click', '.gifImg', function(e) {
                e.preventDefault;  
                
                var state = $(this).attr('data-state');
                console.log(state);

                if (state === 'still') {
                    $(this).attr('data-state', 'animate');
                    $(this).attr('src', $(this).attr('data-animate'));
                } else {
                    $(this).attr('data-state', 'still');
                    $(this).attr('src', $(this).attr('data-still'));
            }

            }); // toggle dat states


            renderButtons();

}); // document on ready