const movieForm = document.querySelector('form');
const movieList = document.querySelector('.movie-list');
const showMovie = document.querySelector('.show-movie')
const movie = document.querySelector('.movie');

const updateUI = (data) => {
    const { movieResult } = data;
    console.log(movieResult)
    movieList.innerHTML = '';
    if(movieResult.Response === "False"){
        movieList.innerHTML += `
            <h6 class='text-light'>movie not found</h6>
        `;
    } else {
        movieResult.Search.forEach(movie => {
            movieList.innerHTML += `
            <div class="movie card mx-auto shadow-lg bg-dark my-3 text-light text-center" movie-id="${movie.imdbID}" style="width: 18rem;">
                <img src="${movie.Poster}" class="card-img-top">
                <div class="card-body">
                    <h5 class="movie-title tex">${movie.Title}</h5>
                    <h6 class="movie-year">${movie.Year}</h6>
                </div>
            </div>
            `;    
        });
    }
   
 
}

const showDetail = (data) => {
    const { movieDetail } = data
    showMovie.innerHTML = '';
    showMovie.innerHTML += `
    <div class="card mb-5 mx-auto bg-dark text-light">
        <div class="row no-gutters">
        <div class="col-md-4">
            <img src="${movieDetail.Poster}"> </img>
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h4 class="card-title mt-4"><strong>${movieDetail.Title}</stromg> (${movieDetail.Year})</h4>
            <h6 class="card-text mt-0"><strong>Director</strong> - ${movieDetail.Director}</h6>
            <p class="card-text mt-2"><strong>Plot</strong></p>
            <p class="card-text">${movieDetail.Plot}</p>
            <p class="card-text mt-2"><strong>Runtime</strong> - ${movieDetail.Runtime}</p>
            <p class="card-text mt-2"><strong>Genre</strong> - ${movieDetail.Genre}</p>
            <p class="card-text mt-2"><strong>Release Date</strong> - ${movieDetail.Released}</p>
            
            </div>
        </div>
        </div>
    </div>
    `;
}

const updateMovie = async (movie) => {
    const movieResult = await searchMovie(movie);

    return { movieResult }
};



const detailMovie = async (movieID) => {
    const movieDetail = await getMovie(movieID);

    return { movieDetail }
};

movieForm.addEventListener('submit', e => {
    e.preventDefault();

    const movie = movieForm.movie.value.trim();
    movieForm.reset()

    updateMovie(movie)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
        
})

movieList.addEventListener('click',e => {
    const movieInfo =  e.path.find(item => {
        if(item.classList){
            return item.classList.contains('movie');
        }else{
            return false;
        }
    }); 
    if(movieInfo){
        const movieID  = movieInfo.getAttribute('movie-id')
        detailMovie(movieID)
            .then(data => showDetail(data))
            .catch(err => console.log(err))
    }
})