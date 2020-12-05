import React, {useState, useEffect} from 'react'
import styles from './styles/Movies.module.css'


export default function Movies(){

  const [input, setInput] = useState({
    title: "",
    releaseDate: "", 
    genre: "",
    favourite: false
  })
  const [movies, setMovies] = useState([])
  const [moviesToEdit, setMoviesToEdit] = useState(null)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [showActive, setShowActive] = useState("ALL")

  useEffect(() => {
    //fetch from ls
    const initialMovies = localStorage.getItem("movies List")
    const parsedMovies = JSON.parse(initialMovies)
    setMovies(parsedMovies)
    setFilteredMovies(parsedMovies)
  }, [])


  function handleChange(e) {
    const {name, value} = e.target
    setInput({...input, [name]: value})
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newInput = {
      title: input.title,
      releaseDate: input.releaseDate,
      id: input.id || new Date().getTime(),
      genre: input.genre,
      favourite: input.id ? input.favourite : false
    }
    
    const iterableMovies = movies || []
    let mergedInput = [...iterableMovies,newInput]
    if(input.id) {
      mergedInput = iterableMovies.map(movie => movie.id === input.id ? 
        {...movies, title: input.title, releaseDate: input.releaseDate, genre: input.genre}
         : movie
      )
    }
    setMovies(mergedInput);
    const jsonNewInput = JSON.stringify(mergedInput);
    localStorage.setItem("movies List",jsonNewInput);
    setInput({
      title: "",
      releaseDate: "", 
      genre: "",
      favourite: false
    })
    setMoviesToEdit(null)

    setFilteredMovies(mergedInput)

  }
  function handleDelete(movieId) {
    // const filteredMovies = Movies.filter(function(movie) {
    //   return movie.id !== movieId
    // })
    const remainingMovies = movies.filter((movie) => movie.id !== movieId)
    setMovies(remainingMovies)
    localStorage.setItem("movies List", JSON.stringify(remainingMovies))
    setFilteredMovies(remainingMovies)
  }
  function handleEdit(movie) {
    setMoviesToEdit(movie)
    setInput(movie)
  }
  function toggleFavourite(movieIdToToggle) {
    const iterableMovies = movies || []
    const mergedInput = iterableMovies.map(movie => movie.id === movieIdToToggle ? 
      {...movie, favourite: !movie.favourite}
       : movie
    )
    //update db
    localStorage.setItem("movies List", JSON.stringify(mergedInput))
    //update state
    setMovies(mergedInput)
  }
  function toggleFilter() {
    let currentState;
    if(showActive === "ALL") {
      currentState = "FAVOURITE"
      const iterableMovies = movies || []
      const favMovies = iterableMovies.filter(iterableMovie => (
        iterableMovie.favourite === true
      ))
      setFilteredMovies(favMovies)
    } else {
      currentState = "ALL"
      setFilteredMovies(movies)
    }
    setShowActive(currentState)
  }



    return(

      <div className={styles.container}>


      <div className={styles.movieContainer}>
        <div className={styles.heading}>My movie list</div>


      <form className={styles.moviesForm} onSubmit = {e => handleSubmit(e)}>
      <div className={styles.moviesFormHeading}>{moviesToEdit ? "Edit" : "Add new"} Movie</div>
    <div className={styles.moviesInputContainer}>
        <label className={styles.moviesLabel}>Movie Title</label>
        <input name="title" type="text" className={styles.movieInput} value={input.title} onChange = {e => handleChange(e) } />
      </div>
      <div className={styles.moviesInputContainer}>
        <label className={styles.moviesLabel}>Release Year</label>
        <input name="releaseDate" type="date" className={styles.movieInput} value={input.releaseDate} onChange = {e => handleChange(e)} />
      </div>
      <div className={styles.moviesInputContainer}>
        <label className={styles.moviesLabel}>Genre</label>
        <input name="genre" type="text" className={styles.movieInput} value={input.genre} onChange = {e => handleChange(e)} />
      </div>
      <button className={styles.moviesFormSubmit}>{moviesToEdit ? "Update" : "Add"} Movies</button>
    </form>  


      <div className={styles.movieBody}>
      <div className={styles.filterMovie}>
        <button
        onClick = {toggleFilter}
         className = {`${showActive === "ALL" ? "is-active" : ""}`} disabled = {showActive === "ALL"}>Show all</button>
        <button
        onClick = {toggleFilter}
         className={`${showActive === "FAVOURITE" ? "is-active" : ""}`} disabled = {showActive === "FAVOURITE"}>Show favourite</button>
      </div>
      {
        (filteredMovies && filteredMovies.length > 0) ? (filteredMovies.map(movie => (
          <div className={styles.movie} key={movie.id}>
            <div className={styles.movieDetails}>
              <div className={styles.movieTitle}>Title: {movie.title}</div>
              <div className={styles.movieYear}>Release Date: {movie.releaseDate}</div>
              <div className={styles.movieGenre}>Genre: {movie.genre}</div>
            </div>
            <div className={styles.moviesAction}>
            {
              movie.favourite ? (
              <button onClick = {() => toggleFavourite(movie.id)} title="Mark as non-favourite">
              ⭐️
              </button>
              ) : (
              <button onClick = {() => toggleFavourite(movie.id)} title="Mark as favourite">
              ✩
              </button>
              )
            }
              <button onClick = {() => handleEdit(movie)}>Edit</button>
              <button onClick = {() => handleDelete(movie.id)}>Delete</button>
            </div>
          </div>
        ))) : (
          <div>No Movies here. Be the first to add</div>
        )
      }
        
      </div>

      </div>
  
      </div>
        
    )
}