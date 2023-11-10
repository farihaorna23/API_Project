const {
  findOne,
  findAll,
  addNew,
  updateMovie,
  deleteMovie
} = require("./query.js");
const express = require("express");

const router = express.Router();

//this get method will send all the movie data if no id is given but if an id is given, it will send  all of the information of that movie id
router.get("/:id?", async (req, res, next) => {
  const { id } = req.params;
  let data;

  try {
    if (id) {
      if (isNaN(parseInt(id))) {
        res.status(400).json({ msg: "Invalid Id" });
      }
      data = await findOne(parseInt(id));
    } else {
      data = await findAll();
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  let movieInfo = req.body;

  try {
    let data = await addNew(movieInfo);
    res.json({ msg: "Movie Added" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  let { id } = req.params;
  let movieData = req.body;

  try {
    if (isNaN(parseInt(id))) {
      res.status(400).json({ msg: "Invalid Id" });
    }
    let data = await updateMovie(movieData, parseInt(id));
    res.json({ msg: "Updated Movie movieInfo" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  let { id } = req.params;
  try {
    if (isNaN(parseInt(id))) {
      res.status(400).json({ msg: "Invalid Id" });
    }
    let data = await deleteMovie(parseInt(id));
    res.json({ msg: "Deleted Movie" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
