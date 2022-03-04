import React,{ useState } from 'react';
import Movie from "../Movie/Movie";
import SearchIcon from "@mui/icons-material/Search";

import { backendUrl } from '../../constants';

const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState("");  
  const [searchRes, setSearchRes] = useState([]);
  const [heading,setHeading] = useState("")

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`${backendUrl}search/${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSearchRes(data.results))
      setHeading(["Showing results for ", `"${searchTerm}"`]);
    };

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25px",
            marginBottom: "20px",
          }}
        >
          <h1>Search for any movie</h1>
          <SearchIcon fontSize="large" />
        </div>
        <div className="searchBar">
          <form onSubmit={handleSubmit}>
            <input
              required
              autoFocus
              type="search"
              className="search"
              placeholder="enter a movie name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        {searchRes.length > 0 && (
          <>
            <h2 className="results">{heading}</h2>
            <div className="movie_container">
              {searchRes.map((movie) => {
                return <Movie key={movie.id} movie={movie} type="normal" />;
              })}
            </div>
          </>
        )}
      </div>
    );
}

export default SearchBar;
