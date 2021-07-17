document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('search-form').addEventListener('submit', function (event) {
		event.preventDefault();
		let searchString = document.getElementById('search-bar').value;
		let urlEncodedSearchString = encodeURIComponent(searchString);
		axios.get('https://www.omdbapi.com/?apikey=236fac7d&s=' + urlEncodedSearchString).then(function (response) {
			console.log(response)
			let movie_container = document.getElementById('movies-container');
		movie_container.innerHTML = renderMovies(response.data.Search)
		})
		

	})
});

function renderMovies(movieArray) {
	
	let movieHTML = movieArray.map(function (movie) {
		return `
		<div class= col-4 movie mb-4>
		<div class="card">
			<img src="${movie.Poster}" class="card-img-top" alt="...">
			<div class="card-body">
			  <h5 class="card-title">${movie.Title}</h5>
			  <p class="card-text"${movie.Year}</p>
			  <a href="#" onClick=saveToWatchlist('${movie.imdbID}') class="btn btn-primary">Add to Favorites</a>
			</div>
		  </div>
		</div>
		`
	})

	return movieHTML.join('');
};

function saveToWatchlist(imdbID) {
	fetch('https://www.omdbapi.com/?apikey=236fac7d&i='+ imdbID)
  .then(response => response.json())
  .then(data =>  {
	  console.log(data)
	  let watchlistJSON = localStorage.getItem('watchlist');
	let watchlist = JSON.parse(watchlistJSON);

	if (watchlist == null) {
		watchlist = [];
	}

	watchlist.push(data);
	localStorage.setItem('watchlist', JSON.stringify(watchlist));
  })
}	