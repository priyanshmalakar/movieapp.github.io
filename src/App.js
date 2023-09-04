import React, { useEffect, useState } from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MoviesList from './components/MoviesList';
import SearchBox from './components/SearchBox';
import MovieListHeading from './components/MovieListHeading';
import AddToFavourites from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites'

const App=()=>{
  const [movies , SetMovies] = useState([]);
  const [searchValue , setSearchValue] = useState('Avenger');
  const [favourites , setFavourites] = useState([]);

  const getMovieRequest = async(searchValue)=>{
    
    const url =`http://www.omdbapi.com/?s=${searchValue}&apikey=e98acbcd`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if(responseJson.Search){
      SetMovies(responseJson.Search);
    }
  }
  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

  const addFavouritesMovie =(movie)=>{
    const newFavouritesMovie = [...favourites , movie];
    setFavourites(newFavouritesMovie);
    saveToLocalStorage(newFavouritesMovie);
  }
  const RemoveFromFavourites =(movie)=>{
    const newFavouritesMovie = favourites.filter(
      (favourite)=> favourite.imdbID !== movie.imdbID
    )
    setFavourites(newFavouritesMovie);
    saveToLocalStorage(newFavouritesMovie);
  }

  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);
  
	// useEffect(() => {
	// 	const movieFavourites = JSON.parse(
	// 		localStorage.getItem('react-movie-app-favourites')
	// 	)
	// 	setFavourites(movieFavourites);
	// }, []);

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="FanMovies"/>
      <SearchBox searchValue ={searchValue} setSearchValue={setSearchValue}/>
      </div>
    <div className='row'>
      <MoviesList 
      movies={movies} 
      favouriteComponent={AddToFavourites}
      handleFavouritesClick = {addFavouritesMovie}
      />
    </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MoviesList movies={favourites} handleFavouritesClick={RemoveFromFavourites} favouriteComponent={RemoveFavourites} />
			</div>
    </div>
  )
}

export default App
