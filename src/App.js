import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// Sample default movies
const defaultMovies = [
    {
        Title: "Inception",
        Year: "2010",
        imdbID: "tt1375666",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    },
    {
        Title: "Interstellar",
        Year: "2014",
        imdbID: "tt0816692",
        Poster: "https://m.media-amazon.com/images/M/MV5BZDU5NTJkMjQtNGYyZC00NjYwLWJlNWMtODk5NDI5MDE3NDJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    {
        Title: "The Dark Knight",
        Year: "2008",
        imdbID: "tt0468569",
        Poster: "https://images.moviesanywhere.com/bd47f9b7d090170d79b3085804075d41/c6140695-a35f-46e2-adb7-45ed829fc0c0.jpg",
    },
    {
        Title: "Iron Man",
        Year: "2008",
        imdbID: "tt0468562323",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_FMjpg_UX1000_.jpg",
    },
    {
        Title: "Parasite",
        Year: "2008",
        imdbID: "tt0468569121",
        Poster: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg",
    },
    {
        Title: "The Conjuring",
        Year: "2008",
        imdbID: "tt0468569455",
        Poster: "https://m.media-amazon.com/images/M/MV5BOTRkMDlmZWEtMzQyYy00YzgyLTgwM2QtNzgxYmIwNGVlYmJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    {
        Title: "End-Game",
        Year: "2019",
        imdbID: "tt04685695666",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
    },
    {
        Title: "KGF",
        Year: "2021",
        imdbID: "tt04685696777",
        Poster: "https://m.media-amazon.com/images/M/MV5BM2M0YmIxNzItOWI4My00MmQzLWE0NGYtZTM3NjllNjIwZjc5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    {
        Title: "Three idiots",
        Year: "2021",
        imdbID: "tt046856909876",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
];

const API_URL = "https://www.omdbapi.com/?apikey=5baa7886";

const App = () => {
    const [movies, setMovies] = useState(defaultMovies);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (searchTerm) {
            searchMovies(searchTerm);
        } else {
            // Reset to default movies if no search term is provided
            setMovies(defaultMovies);
        }
    }, [searchTerm]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        if (data.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]); // Handle case where no movies are found
        }
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            searchMovies(searchTerm);
        }
    };

    return (
        <div className="app">
            <div className="logo-container">{ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="50" height="50" role="img" aria-label="Cinscope Logo">
              <circle cx="100" cy="100" r="95" fill="#1f2123" stroke="#0a84ff" strokeWidth="4" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#0066cc" strokeWidth="2" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="#66b2ff" strokeWidth="1" />
              <line x1="30" y1="100" x2="170" y2="100" stroke="#ffffff" strokeWidth="2" />
              <line x1="100" y1="30" x2="100" y2="170" stroke="#ffffff" strokeWidth="2" />
              <circle cx="100" cy="100" r="5" fill="#ffffff" />
            </svg> }
        </div>
            <h1>CineScope</h1> 

            <div className="search">
                <input
                    placeholder="Search for a movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
            </div>

            {movies.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.imdbID} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
};

export default App;
