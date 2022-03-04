import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import { makeStyles } from "@mui/styles";

import { MovieContext } from "../../Global/Context";
import { imageUrl } from "../../constants";

const useStyles = makeStyles((theme) => ({
  btn: {
    color: "#fff",
    backgroundColor: "transparent",
    border: "none",
    transition: "all 0.3s ease",
    fontSize: "1.25rem",
    padding: "5px",
    margin: "0",
    "&:disabled": {
      color: "rgba(255,255,255,0.5)",
    },
    "&:hover": {
      opacity: 0.7,
    },
  },

  // .btn:hover: {
  //   color: #292d61;
  //   cursor: pointer;
  // }
}));


const voteColor = (vote) => {
  return vote >= 8 ? "green" : vote >= 6 ? "orange" : "red";
};


const Movie = ({ movie, type }) => {
  const classes = useStyles();
  const history = useHistory();

  const {
    watchList,
    watched,
    addToWatchList,
    removeFromWatchList,
    moveToWatched,
    removeFromWatched,
  } = useContext(MovieContext);

  const { id, title, poster_path, vote_average } = movie;

  let movieInWatchList =
    watchList.length > 0 && watchList.find((stored) => stored.id === id);

  let movieInWatched =
    watched.length > 0 && watched.find((stored) => stored.id === id);

  const watchListDisabled = movieInWatchList ? true : false;

  const watchedDisabled = movieInWatched ? true : false;


  const temp = (movie=null,fn,e) => {
    e.stopPropagation();
    movie? fn(movie): fn()
  };

  const button = (type) => {
    if (type === "normal") {
      return (
        <>
          <Button
            classes={{ root: classes.btn }}
            onClick={(e) => temp(movie, addToWatchList, e)}
            disabled={watchListDisabled || watchedDisabled}
          >
            <VisibilityIcon />
          </Button>
          <Button
            classes={{ root: classes.btn }}
            onClick={(e) => temp(movie, removeFromWatchList, e)}
            disabled={!watchListDisabled}
          >
            <ClearIcon />
          </Button>
        </>
      );
    }
    if (type === "watchList") {
      return (
        <>
          <Button
            classes={{ root: classes.btn }}
            onClick={(e) => temp(movie,moveToWatched,e)}
          >
            <DoneIcon />
          </Button>
          <Button
            classes={{ root: classes.btn }}
            onClick={(e) => temp(movie,removeFromWatchList,e)}
          >
            <ClearIcon />
          </Button>
        </>
      );
    }
    if (type === "watched") {
      return (
        <>
          <Button
            classes={{ root: classes.btn }}
            onClick={(e) => temp(movie,removeFromWatched,e)}
          >
            <ClearIcon />
          </Button>
        </>
      );
    }
  };

  const openMovie = () => {
    history.push(`/movie/${id}`);
  }

  return (
      <div className="movie" onClick={openMovie}>
        <div className="movie_image">
          <img src={imageUrl + poster_path} alt={title + "image"}></img>
        </div>
        <div className="movie_info">
          <h3 title={title}>{title}</h3>
          <span className={`tag ${voteColor(vote_average)}`}>
            {vote_average}
          </span>
        </div>
        <div className="controls">{button(type)}</div>
      </div>
  );
};

export default Movie;
