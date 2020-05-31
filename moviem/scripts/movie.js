
const searchMovie = async (movie) => {
    const base ='http://www.omdbapi.com/';
    const query =`?s=${movie}&apikey=thewdb`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data;
}


const getMovie = async (id) => {
    const base =`http://www.omdbapi.com/`
    const query =`?i=${id}&apikey=thewdb`

    const response = await fetch(base + query);
    const data = await response.json();

    return data;
}