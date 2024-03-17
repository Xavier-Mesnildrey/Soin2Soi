import "dotenv/config";
import express from "express";

import {
  careRouter,
  cityRouter,
  conditionRouter,
  placeRouter,
  userRouter,
} from "./routers";

const app = express();

app.use("/api", userRouter);
app.use("/api", careRouter);
app.use("/api", cityRouter);
app.use("/api", conditionRouter);
app.use("/api", placeRouter);

const port = process.env.APP_PORT;

app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
