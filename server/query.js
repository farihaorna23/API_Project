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

const addLog = async logininfo => {
  const queryStr = `INSERT INTO requestInfo (timestamp, method, endpoint, status) VALUES (?,?,?,?)`;
  const values = [
    logininfo.timeStamp,
    logininfo.method,
    logininfo.endpoint,
    logininfo.status
  ];

  try {
    return await query(queryStr, values);
  } catch (error) {
    console.error("Error adding login info to the database", error);
  }
};

const getLog = async () => {
  return await query("SELECT * FROM requestInfo");
};

module.exports = {
  findOne,
  findAll,
  addNew,
  updateMovie,
  deleteMovie,
  addLog,
  getLog
};
