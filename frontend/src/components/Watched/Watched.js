import React, { useContext } from "react";

import DoneIcon from "@mui/icons-material/Done";

import Movie from "../Movie/Movie";
import { MovieContext } from "../../Global/Context";


const Watched = ({ movie, type }) => {
  const { watched } = useContext(MovieContext);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "25px",
          marginBottom: "20px",
        }}
      >
        <h1>Watched</h1>
        <DoneIcon fontSize="large" />
      </div>
      <div className="movie_container">
        {watched.length > 0 ? (
          watched.map((movie) => {
            return <Movie key={movie.id} movie={movie} type="watched" />;
          })
        ) : (
          <h4>You haven't added any movies. Add some!</h4>
        )}
      </div>
    </>
  );
};

export default Watched;
