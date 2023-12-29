const express = require("express");
const router = express.Router();
const FilmMainController = require("../controllers/FilmMains");
const Search = require("../controllers/SearchTitle");
// const limiter = require("./limiter");

router
  .route("/")
  .get(FilmMainController.GetFilms)
  .post(FilmMainController.CreateFilms);

router.route("/:title").get(Search.SearchByTitle);
router.route("/:id").delete(Search.DeleteItems).put(Search.UpdateFilm);

router.route("/:title").get(Search.SearchByTitle);
router.route("/:id").delete(Search.DeleteItems).put(Search.UpdateFilm);

module.exports = router;
