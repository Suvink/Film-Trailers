const express = require("express");
const router = express.Router();
const FilmMainController = require("../controllers/FilmMains");
const Search = require("../controllers/SearchTitle");
const limiter = require("./limiter");

router
  .route("/")
  .get(limiter, FilmMainController.GetFilms)
  .post(limiter, FilmMainController.CreateFilms);

router.route("/:title").get(limiter, Search.SearchByTitle);
router
  .route("/:id")
  .delete(limiter, Search.DeleteItems)
  .put(limiter, Search.UpdateFilm);

module.exports = router;
