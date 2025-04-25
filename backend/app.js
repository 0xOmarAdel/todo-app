require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRouter");
const todoRouter = require("./routes/todoRouter");

// error handler
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

// auth middleware
const authenticateUser = require("./middleware/authMiddleware");

// json middleware
app.use(express.json());

// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/auth", authRouter);
app.use("/todos", authenticateUser, todoRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
