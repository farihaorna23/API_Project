const query = require("../db/index.js");

const findOne = async movieID => {
  return await query("SELECT * FROM Movie WHERE id = ?", [movieID]);
};

const findAll = async () => {
  return await query("SELECT * FROM Movie");
};

const addNew = async movie => {
  return await query("INSERT INTO Movie SET ?", [movie]);
};

const updateMovie = async (updatedInfo, movieID) => {
  return await query("UPDATE Movie SET ? WHERE id = ?", [updatedInfo, movieID]);
};

const deleteMovie = async movieID => {
  return await query("DELETE FROM Movie WHERE id = ?", [movieID]);
};

module.exports = {
  findOne,
  findAll,
  addNew,
  updateMovie,
  deleteMovie
};
