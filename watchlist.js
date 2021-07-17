document.addEventListener('DOMContentLoaded', function () {
    let movie_container = document.getElementById('movies-container');
    let movies = JSON.parse(localStorage.getItem('watchlist'));
    movie_container.innerHTML = renderMovies(movies)
});


function renderMovies(movieArray) {
	
	let movieHTML = movieArray.map(function (movie) {
		return `
		<div class= col-4 movie mb-3>
		<div class="card">
			<img src="${movie.Poster}" class="card-img-top" alt="...">
			<div class="card-body">
			  <h5 class="card-title">${movie.Title}</h5>
			  <p class="card-text"${movie.Year}</p>
			  <a href="#" class="btn btn-primary">Remove from Favorites</a>
			</div>
		  </div>
		</div>
		`
	})

	return movieHTML.join('');

};

  