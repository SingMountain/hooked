import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
import spinne from "../assets/ajax-loader.gif";

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
    let controller=new AbortController();
    let signal=controller.signal;
    let timeoutflag=false;
    const timeoutPromise = (timeout)=> {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(timeoutflag=true);
                }, timeout)
            })
        };
    const fetchPromise=
      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=e38cefec`,{signal:signal})
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          setLoading(false);
          setMovies(jsonResponse.Search);
        } else if (jsonResponse.Error) {
          setLoading(false);
          setErrorMessage("没找到哦！");  
        }  
      })
      
        //超时检测
        Promise.race([timeoutPromise(5000),fetchPromise]).then(
          (timeoutflag)=>{
            if(timeoutflag===true){
              controller.abort();
              setLoading(false);
              setErrorMessage("请求超时！")
            }
          });
     
  }

  return (
    <div className="App">
      <Header text="搜索电影" />
      <Search search={search} />
      <p className="App-introduce">搜索你喜欢的电影</p>
      <div className="movies">
        {
          loading ? (<span className="spinne"><img  src={spinne} alt="Loading..." /></span>) :
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
