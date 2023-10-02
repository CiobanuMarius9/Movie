import React, { useEffect, useState } from "react";
import lodash from "lodash";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";

const MovieList = ({ type, title, emoji }) => {
  const [movieData, setMovieData] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  useEffect(() => {
    fetchMovies();
  }, [type]);

  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = lodash.orderBy(
        filteredMovies,
        [sort.by],
        [sort.order]
      );
      setFilteredMovies(sortedMovies);
    }
  }, [sort]);

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=883ba4abd32ff86e8b0ef94c27fa6ac8`
    );
    const data = await response.json();

    setMovieData(data.results);
    setFilteredMovies(data.results);
  };

  const handleFilter = (rating) => {
    if (rating === minRating) {
      setMinRating(0);
      setFilteredMovies(movieData);
    } else {
      setMinRating(rating);
      const filtered = movieData.filter(
        (movie) => movie.vote_average >= rating
      );
      setFilteredMovies(filtered);
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {title}{" "}
          <img src={emoji} alt={`${emoji} icon`} className="navbar_emoji" />
        </h2>
        <div className="align_center movie_list_fs">
          <FilterGroup
            minRating={minRating}
            handleFilter={handleFilter}
            ratings={[8, 7, 6]}
          />
          <select
            name="by"
            className="movie_sorting"
            onChange={handleSort}
            value={sort.by}
          >
            <option value="default">Sort By</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            className="movie_sorting"
            onChange={handleSort}
            value={sort.order}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie_cards">
        {filteredMovies?.map((item) => (
          <MovieCard movie={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
