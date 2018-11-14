import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var imgUrl="";
class App extends Component {
  constructor(){
    super()

    this.state={
      movies: []
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    var query = this.input.value;
    console.log(query);
    this.componentDidMount(query);
  }
  componentDidMount(query){
    var api = 'https://www.omdbapi.com/?i=tt3896198&apikey=90c556a5&s='

    axios.get(api + query)
      .then(response =>
        this.setState ({

          movies:response.data.Search
        }
      )

       // console.log(response)
    )
  }



  render() {
    const {movies} = this.state;

    var movieList = movies.map((movie) =>
    <div className="col-4 movie">
    <img src={imgUrl + movie.Poster}className="movieImg" />
      <p className="title">{movie.Title}</p>
      <p className="year">{movie.Year}</p>
      <h3  key={movie.imdbID} className="text-center movieTitle">{movie.Title}</h3>
    </div>)
    return (
      <div className="App">
        <div className="jumbotron">
            <div className="container">
            <div className="row">
            <h2 className="col-12 text-center">Search for a Movie</h2>
              <form onSubmit={this.onSubmit} className="col-12">
                <input className= "col-12 form-control" placeholder="Search Movies..."
                ref = {input => this.input = input}/>
              </form>
              <div>
                <ul className= "col-12 row">{movieList}</ul>
              </div>
              </div>
            </div>
          </div>
      </div>
    );
  }


}


export default App;
