import React, { useEffect, useState } from "react";
import "./MovieList.css";
import Fire from "../../assets/fire.png";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=883ba4abd32ff86e8b0ef94c27fa6ac8"
    );
    const data = await response.json();

    setMovieData(data.results);
  };

  console.log(movieData);

  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          Popular <img src={Fire} alt="fire emoji" className="navbar_emoji" />
        </h2>
        <div className="align_center movie_list_fs">
          <ul className="align_center movie_filter">
            <li className="movie_filter_item active">8+ Star</li>
            <li className="movie_filter_item">7+ Star</li>
            <li className="movie_filter_item">6+ Star</li>
          </ul>
          <select className="movie_sorting">
            <option value="">Sort By</option>
            <option value="">Date</option>
            <option value="">Rating</option>
          </select>
          <select className="movie_sorting">
            <option value="">Ascending</option>
            <option value="">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie_cards">
        {movieData?.map((item) => (
          <MovieCard movie={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
