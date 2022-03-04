import React, { useContext } from "react";

import BookmarkIcon from "@mui/icons-material/Bookmark";

import { MovieContext } from "../../Global/Context";
import Movie from "../Movie/Movie";

const WatchList = ({ movie, type }) => {
  const { watchList } = useContext(MovieContext);

  return (
    <>
      <div
        style={{
          marginTop: "25px",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          <h1>Watchlist</h1>
          <BookmarkIcon fontSize="large" />
        </div>
        {watchList.length > 0 && (
          <div className="count">
            <h3>{watchList.length} movies</h3>
          </div>
        )}
      </div>
      <div className="movie_container">
        {watchList.length > 0 ? (
          watchList.map((movie) => {
            return <Movie key={movie.id} movie={movie} type="watchList" />;
          })
        ) : (
          <h4>You haven't added any movies. Add some!</h4>
        )}
      </div>
    </>
  );
};

export default WatchList;
