import React from 'react';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://www.oschina.net/uploads/img/201101/19002304_36UU.jpg";

const Movie=(props)=>{
    const movie=props.movie;
    const poster=
    movie.Poster ? movie.Poster : DEFAULT_PLACEHOLDER_IMAGE ;

    
    return(
        <div className="movie">
            <h2>{movie.Title}</h2>
            <div>
                <img src={poster} alt={`The movie titled: ${movie.Title}`}></img>
            </div>
            <p>{movie.Year}</p>
        </div>
    )
}
export default Movie;