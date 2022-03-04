import React, {useState} from "react";
import { Link } from "react-router-dom";

import MovieIcon from "@mui/icons-material/Movie";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import "./header.css";

const Header = () => {

  const [clicked,setClicked] = useState(false);

  const handleClick = () => {
    setClicked(prev => !prev);
  }

  return (
    <nav className="nav">
      <h1>
        <Link to="/" className="navTitle">
          MovieFlix
        </Link>
        <MovieIcon fontSize="large" />
      </h1>
      <div className="navLogo" onClick={handleClick}>
        <button>{clicked ? <ClearIcon fontSize="large" /> : <MenuIcon fontSize="large" />}</button>
      </div>
      <div className={clicked ? "navItems active" : "navItems"}>
        <Link
          onClick={() => setClicked(false)}
          to="/watchlist"
          className="item"
        >
          Watchlist
        </Link>
        <Link onClick={() => setClicked(false)} to="/watched" className="item">
          Watched
        </Link>
        <Link
          onClick={() => setClicked(false)}
          to="/searchbar"
          className="item"
        >
          Search
        </Link>
      </div>
    </nav>
  );
};

export default Header;
