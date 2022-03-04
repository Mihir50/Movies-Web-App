import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import data from "./codeToCountry.json";
import { baseImageUrl, imageUrl, backendUrl } from "../../constants";


const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [watch, setWatch] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetch(`${backendUrl}movieDetails/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  useEffect(() => {
    fetch(`${backendUrl}watchProviders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWatch(data.results);
      });
  }, [id]);

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  const countryToCode = (code) => {
    return data[code];
  };

  const tidyUp = () => {
    if (country === "") return;

    const images = new Set();

    if (watch[country]["flatrate"] !== undefined) {
      watch[country]["flatrate"].forEach((img) => {
        images.add(img["logo_path"]);
      });
    }
    if (watch[country]["buy"] !== undefined) {
      watch[country]["buy"].forEach((img) => {
        images.add(img["logo_path"]);
      });
    }
    if (watch[country]["rent"] !== undefined) {
      watch[country]["rent"].forEach((img) => {
        images.add(img["logo_path"]);
      });
    }

    return [...images].map((img, idx) => (
      <img key={idx} src={baseImageUrl + img} alt="movie_img" />
    ));
  };

  return (
    <div className="container">
      <div className="movie_header">
        <h1>{movie.title}</h1>
      </div>
      <div className="inner">
        <div className="imgVid">
          <img
            className="poster_image"
            src={imageUrl + movie.poster_path}
            alt={movie.tite}
          />
          {movie.videos && (
            <iframe
              title={`${movie.title} trailer`}
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
              frameBorder="0"
            ></iframe>
          )}
        </div>
        <div className="categories">
          {movie.genres &&
            movie.genres.map((m) => {
              return <Chip key={m.id} label={m.name} />;
            })}
          <Chip label={movie.runtime + "m"} />
          <Chip label={movie.release_date} />
          <Rating
            name="half-rating-read"
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
          />
        </div>
        <p className="overview">{movie.overview}</p>
        <div className="companies">
          {movie.production_companies &&
            movie.production_companies.map((m) => {
              return <Chip key={m.id} label={m.name} />;
            })}
        </div>
        <div className="watch">
          <h2>Watch Providers</h2>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select country
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Select Country"
              onChange={handleChange}
            >
              {watch &&
                Object.keys(watch).map((c) => {
                  return (
                    <MenuItem key={c} value={c}>
                      {countryToCode(c)}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <div className="watch">
            <div>{tidyUp()}</div>
          </div>
        </div>
        <div className="review_container">
          <h2>Reviews</h2>
          {movie.reviews &&
            movie.reviews.results.map((m) => {
              return (
                <div className="review">
                  <div className="upper">
                    <Avatar
                      alt={m.author_details.username.substring(0, 1)}
                      src={imageUrl + m.author_details.avatar_path}
                    />
                    <h4>{m.author_details.username}</h4>
                    <p>{m.created_at.substring(0, 10)}</p>
                  </div>
                  <div className="lower">
                    <p>{m.content}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="similar">
        <h2>Similar Movies</h2>
        <div className="similar_row">
          {movie.similar &&
            movie.similar.results.map((m) => {
              return (
                <img
                  className="similar_img"
                  src={imageUrl + m.poster_path}
                  alt={m.title}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
