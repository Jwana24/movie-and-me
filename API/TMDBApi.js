import axios from 'axios';

const API_TOKEN = 'fc7b3d226f9f52713b21cc0e39d83d32';

export const getApiMovies = (text, page) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${text}&page=${page}`;
    return axios.get(url)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err))
}

export const getPosterApi = (name) => {
    return `https://image.tmdb.org/t/p/w300${name}`;
}