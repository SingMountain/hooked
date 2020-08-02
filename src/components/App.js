import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=e38cefec";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=e38cefec`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          setMovies(jsonResponse.Search);
        } else if (jsonResponse.Error) {
          setErrorMessage("没找到哦！");
        }
        setLoading(false);
      });
  }

  return (
    <div className="App">
      <Header text="搜索电影" />
      <Search search={search} />
      <p className="App-introduce">搜索你喜欢的电影</p>
      <div className="movies">
        {
          loading ? (<span>Looding....</span>) :
            errorMessage ? (<div className="errorMessage">{errorMessage}</div>) :
              (movies.map((movie) =>
                (<Movie key={movie.imdbID} movie={movie} />)

              ))
        }
      </div>
    </div>
  );
}


export default App;
