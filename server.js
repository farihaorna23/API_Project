const express = require("express");
const morgan = require("morgan");

const app = express();

//middleware to parse JSON request
app.use(express.json());

//middleware for logging HTTP request and their methods
app.use(morgan("dev"));

//a testing route to see if the server is working correctly
app.get("/test", (req, res, next) => {
  try {
    res.json({ msg: "code working" });
  } catch (error) {
    next(error);
  }
});

// Handle client errors (e.g., when the user requests a non-existent route).
app.use((req, res, next) => {
  try {
    res.status(404).json({ msg: "Client Error. The Route doesn't exist" });
  } catch (error) {
    next(error);
  }
});

//Handle Server side error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ msg: "Server Error" });
});

//Start the server, listening on port 3000
app.listen(3000, () => {
  console.log("Sever running on port 3000..");
});
