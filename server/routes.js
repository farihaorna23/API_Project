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

module.exports = router;
