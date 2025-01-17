import React from "react";

const MovieCard = ({ movie }) => {
    const openWikipedia = () => {
        const formattedTitle = movie.Title.split(" ").join("_"); // Replace spaces with underscores
        const wikiUrl = `https://www.imdb.com/find/?q=${formattedTitle}&ref_=nv_sr_sm`;
        window.open(wikiUrl, "_blank"); // Open in a new tab
    };
    return (
        <div className="movie" onClick={openWikipedia} style={{ cursor: "pointer" }}>
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <img
                    src={
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/400"
                    }
                    alt={movie.Title}
                />
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    );
};

export default MovieCard;
