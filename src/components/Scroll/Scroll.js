import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles((theme) => ({
  toTop: {
    zIndex: 2,
    position: "fixed",
    bottom: "2vh",
    right: "5%",
    backgroundColor: "#f2f2f2",
    "&:hover, &.Mui-focusVisible": {
        transition: "0.3s",
        backgroundColor: "grey",
    },
  },

}));

const Scroll = ({ showBelow }) => {
  const classes = useStyles();
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow){
        if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };
  
  const handleClick = () => {
    window["scrollTo"]({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });

  return (
    <div>
      {show && (
        <IconButton onClick={handleClick} className={classes.toTop}>
          <ExpandLessIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Scroll;
