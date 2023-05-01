import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import connection from "./config/db.js";
//routes
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

// validation user
app.use(errorMiddleware);

connection();
app.listen(PORT, () => {
  console.log(`Server is listining on http://localhost:${PORT}`.bgGreen.white);
});
