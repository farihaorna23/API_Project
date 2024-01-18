const {
  findOne,
  findAll,
  addNew,
  updateMovie,
  deleteMovie,
  getLog
} = require("./query.js");
const express = require("express");
//creating a router object from express to handle route specific logic
const router = express.Router();

router.get("/log", async (req, res, next) => {
  try {
    const data = await getLog();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

//this get method will send all the movie data if no id is given but if an id is given, it will send  all of the information of that movie id
router.get("/:id?", async (req, res, next) => {
  const { id } = req.params;

  try {
    if (id) {
      const parsedID = parseInt(id);
      if (isNaN(parsedID)) {
        return res.status(400).json({ msg: "Invalid Id" });
      }
      const data = await findOne(parsedID);
      res.json(data);
    } else {
      const data = await findAll();
      res.json(data);
    }
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
