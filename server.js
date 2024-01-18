const express = require("express");
const morgan = require("morgan");
const router = require("./server/routes.js");
const { addLog } = require("./server/query");

const app = express();

//middleware to parse JSON request
app.use(express.json());

//middleware for logging HTTP request and their methods
app.use(morgan("dev"));

//would retrive all the log information of all the upcoming request and send it to the database to be added
app.use(async (req, res, next) => {
  try {
    const time = new Date();

    res.on("finish", async () => {
      const logininfo = {
        timeStamp: time,
        method: req.method,
        endpoint: req.originalUrl,
        status: res.statusCode
      };

      await addLog(logininfo);
    });
    next(); //very important to pass control to the next middleware
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use("/movies", router);

//a testing route to see if the server is working correctly
app.get("/test", (req, res, next) => {
  try {
    res.json({ msg: "code working" });
  } catch (error) {
    next(error);
  }
});

// Handle client side errors (e.g., when the user requests a non-existent route).
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
