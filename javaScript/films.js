$(document).ready(function() {
    $('#searchBtn').click(function() {
        let movieTitle = $('#movieTitle').val();
        let type = $('#type').val();
        let apiKey = 'fddf2808'; 

        $.ajax({
            url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}&type=${type}`,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.Response === 'True') {
                    displayMovies(data.Search);
                } else {
                    $('#movieResults').html('<p>Movie not found!</p>');
                }
            },
            error: function(err) {
                console.error('Error fetching data:', err);
            }
        });
    });

    function displayMovies(movies) {
        let movieHtml = '';
        movies.forEach(function(movie) {
            movieHtml += `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${movie.Poster}" class="img-fluid rounded-start" alt="${movie.Title} Poster">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${movie.Title}</h5>
                                <p class="card-text">Type: ${movie.Type}</p>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#movieModal" data-id="${movie.imdbID}">
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        $('#movieResults').html(movieHtml);
    }

    $('#movieResults').on('click', '.btn-primary', function() {
        let imdbID = $(this).data('id');
        let apiKey = 'fddf2808';

        $.ajax({
            url: `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $('#movieModalLabel').text(data.Title);
                $('#movieModalBody').html(`
                    <p>Year: ${data.Year}</p>
                    <p>Rated: ${data.Rated}</p>
                    <p>Released: ${data.Released}</p>
                    <p>Runtime: ${data.Runtime}</p>
                    <p>Genre: ${data.Genre}</p>
                    <p>Director: ${data.Director}</p>
                    <p>Plot: ${data.Plot}</p>
                `);
            },
            error: function(err) {
                console.error('Error fetching movie details:', err);
            }
        });
    });
});