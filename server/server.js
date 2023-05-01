import express from "express";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listining on http://localhost:${PORT}`.bgGreen.white);
});
