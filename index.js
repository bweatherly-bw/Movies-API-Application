document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('search-form').addEventListener('submit', function (event) {
		event.preventDefault();
		let searchString = document.getElementById('search-bar').value;
		let urlEncodedSearchString = encodeURIComponent(searchString);
		axios.get('http://www.omdbapi.com/?apikey=236fac7d&s=' + urlEncodedSearchString).then(function (response) {
			console.log(response)
			let movie_container = document.getElementById('movies-container');
		movie_container.innerHTML = renderMovies(response.data.Search)
		})
		

	})
});

// API with KEY https://www.omdbapi.com/?i=tt3896198&apikey=236fac7d 
// Here is your key: 236fac7d
// http://www.omdbapi.com/?apikey=3430a78&s=searchString

// http://www.omdbapi.com/?apikey=236fac7d&s=searchString -- "searchString", is replaced with the word(s) that the user inputs and then it will search for that movie 


function renderMovies(movieArray) {
	
	let movieHTML = movieArray.map(function (movie) {
		return `
		<div class= col-4 movie mb-3>
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
	fetch('http://www.omdbapi.com/?apikey=236fac7d&i='+ imdbID)
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