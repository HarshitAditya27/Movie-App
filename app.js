const api = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c0630181c1dda7f935d7ef10088cf2b5&page=1';

const img_path = 'https://image.tmdb.org/t/p/w500';

const search_url = 'https://api.themoviedb.org/3/search/movie?api_key=c0630181c1dda7f935d7ef10088cf2b5&query="';

const main = document.getElementById('main');

const form = document.getElementById('form');

const search = document.getElementById('search');

//Get initial movies 
getMovies(api);
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value
    if (searchTerm && searchTerm !== '') {
        getMovies(search_url + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
})

function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${img_path + poster_path}" alt="${title}" >
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassbyRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `
        main.appendChild(movieEl);
    })
}

function getClassbyRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 6) {
        return 'yellow'
    } else {
        return 'red'
    }
}