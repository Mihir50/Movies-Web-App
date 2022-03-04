import React, { useEffect, useState } from "react";

import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import { makeStyles } from "@mui/styles";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GradeIcon from "@mui/icons-material/Grade";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";

import Movie from "../Movie/Movie";
import { backendUrl } from "../../constants";

const useStyles = makeStyles({
  form: {
    position: "absolute",
    right: "5%",
  },
  select: {
    fontFamily: "Poppins",
    color: "#fff",
  },
});

const HomePage = () => {
  const classes = useStyles();

  const [movies, setMovies] = useState([]);
  const [pref, setPref] = useState({ category: "trending", page: 1 });

  const heading = () => {
    const { category } = pref;
    if (category === "trending") {
      return (
        <>
          <h1>Trending</h1>
          <WhatshotIcon fontSize="large" />
        </>
      );
    }
    if (category === "topRated") {
      return (
        <>
          <h1>Top Rated</h1>
          <GradeIcon fontSize="large" />
        </>
      );
    }
    if (category === "popular") {
      return (
        <>
          <h1>Popular</h1>
          <FavoriteIcon fontSize="large" />
        </>
      );
    }
  };

  useEffect(() => {
    const { category, page } = pref;
    
    const getUrl = (cat, pg) => {
      if (cat === "trending") {
        return `${backendUrl}trending/${pg}`;
      }
      if (cat === "popular") {
        return `${backendUrl}popular/${pg}`;  
      }
      return `${backendUrl}topRated/${pg}`;
    }

    const url = getUrl(category, page)

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
      console.log("useffect");
  }, [pref]);

  const handleChange = (event) => {
    setPref({ category: event.target.value, page: 1 });
  };

  const handlePageClick = (selectedPage) => {
    setPref({ ...pref, page: selectedPage });
    window.scroll(0, 0);
  };

  return (
    <>
      <div className="below_nav">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {heading()}
        </div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={pref.category} onChange={handleChange} displayEmpty>
            <MenuItem value={"trending"}>Trending</MenuItem>
            <MenuItem value={"topRated"}>Top Rated</MenuItem>
            <MenuItem value={"popular"}>Popular</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="movie_container">
        {movies ? (movies.map((movie) => {
          return <Movie key={movie.id} movie={movie} type="normal" />;
        })):(
          [...Array(20)].forEach((_, i) => {
            return (
              <Skeleton
                variant="rectangular"
                width={210}
                height={118}
                animation="wave"
              />
            );
          })
        )
      }
      </div>
      <div className="paginate">
        <Pagination
          onChange={(e) => handlePageClick(e.target.textContent)}
          count={10}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </div>
    </>
  );
};

export default HomePage;
