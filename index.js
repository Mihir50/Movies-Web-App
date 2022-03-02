const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = 5000;
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.REACT_APP_API_KEY}&query=`;

const app = express();

const router = express.Router();

app.use(cors());
app.use("/movies", router);

const getTrending = async (req, res) => {
  try {
    const pageNum = req.params.page;
    const resp = await axios.get(`${trendingUrl}&page=${pageNum}`);
    res.json(resp.data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getTopRated = async (req, res) => {
  try {
    const pageNum = req.params.page;
    const resp = await axios.get(`${topRatedUrl}&page=${pageNum}`);
    res.json(resp.data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getPopular = async (req, res) => {
  try {
    const pageNum = req.params.page;
    const resp = await axios.get(`${popularUrl}&page=${pageNum}`);
    res.json(resp.data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getSearch = async (req, res) => {
  try {
    const searchTerm = req.params.query;
    const resp = await axios.get(`${searchUrl}${searchTerm}`);
    res.json(resp.data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,similar,reviews,credits,watch/providers`
    );
    res.json(resp.data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getWatchProviders = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`
    );
    res.json(resp.data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

router.get("/trending/:page", getTrending);
router.get("/popular/:page", getPopular);
router.get("/topRated/:page", getTopRated);
router.get("/search/:query", getSearch);
router.get("/movieDetails/:id", getMovieDetails);
router.get("/watchProviders/:id", getWatchProviders);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
