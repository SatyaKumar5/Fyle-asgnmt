import React, { Component } from 'react';
import axios from 'axios';

import MovieCard from './MovieCard';
import Search from './Search';


class MovieSearch extends Component {
    state = {
        movieId: 'tt4154756',
        title: " ",
        movie: {},
        searchResults: [],
        isSearching: false,
    }

    componentDidMount() {
        this.loadMovie()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.movieId !== this.state.movieId) {
            this.loadMovie()
        }
    }

    loadMovie() {
        axios.get(`http://www.omdbapi.com/?apikey=90c556a5&i=${this.state.movieId}`)
            .then(response => {
                this.setState({ movie: response.data });
            })
            .catch(error => {
                console.log('Opps!', error.message);
            })
    }

    // we use a timeout to prevent the api request to fire immediately as we type
    timeout = null;

    searchMovie = (event) => {
        this.setState({ title: event.target.value, isSearching: true })

        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            axios.get(`http://www.omdbapi.com/?apikey=90c556a5&s=${this.state.title}`)
                .then(response => {

                    if (response.data.Search) {
                        const movies = response.data.Search.slice(0, 5);
                        this.setState({ searchResults: movies });
                    }
                })
                .catch(error => {
                    console.log('Opps!', error.message);
                })
        }, 1000)


    }

    // event handler for a search result item that is clicked
    itemClicked = (item) => {
        this.setState(
            {
                movieId: item.imdbID,
                isSearching: false,
                title: ""
            }
        )
    }


    render() {
        return (
            <div onClick={() => this.setState({ isSearching: false })}>
                <Search
                    defaultTitle={this.state.title}
                    search={this.searchMovie}
                    results={this.state.searchResults}
                    clicked={this.itemClicked}
                    searching={this.state.isSearching} />

                <MovieCard movie={this.state.movie} />
            </div>
        );
    }
}

export default MovieSearch;
