import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import SearchBox from './components/SearchBox';
import MovieListHeading from './components/MovieListHeading';
import AddFavorites from './components/AddToFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
	const [movies, setMovies] = useState([]);
  	const [searchValue, setSearchValue] = useState('');
  	const [favorites, setFavorites] = useState([]);

  const getMovieRequest = async () => {
	const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=83e2c603`

    //const url = `http://www.omdbapi.com/?i=tt3896198&s=${searchValue}&apikey=83e2c603`

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue, getMovieRequest]);

	// local storage
	useEffect(() => {
		const movieFavorites = JSON.parse(localStorage.getItem('movie-app-favourites'));
		setFavorites(movieFavorites);
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('movie-app-favorites', JSON.stringify(items))
	}

	const addFavoriteMovie = (movie) => {
		const newFavoriteList = [...favorites, movie];
		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};

	const removeFavoriteMovie = (movie) => {
		const newFavoriteList = favorites.filter(
			(favorite) => favorite.imdbID !== movie.imdbID
		);
		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox 
					searchValue={searchValue} 
					setSearchValue={setSearchValue} 
				/>
			</div>
			<div className='row'>
				<MovieList 
					movies={movies} 
					favoriteComponent={AddFavorites}
					handleFavoritesClick={addFavoriteMovie}
				 /> 
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favorites' />
			</div>
			<div className='row'>
				<MovieList 
					movies={favorites} 
					favoriteComponent={RemoveFavorites}
					handleFavoritesClick={removeFavoriteMovie}
				 /> 
			</div>
		</div>
	);
};

export default App;