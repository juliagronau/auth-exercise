import "dotenv/config.js";
import express from "express";
import jwtRouter from "./routes/auth.js";
import "./db/mongoose.js";

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/jwt", jwtRouter);

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);
