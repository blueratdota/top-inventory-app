import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import pool from "./config/db.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Change to your frontend's URL
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
};
const port = process.env.PORT || 3001;
// since not using cmjs - use this
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(`### pathname is: ${__filename}`);

// body parser middleware
// must be before other
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/", inventoryRoutes);
app.use("/api/users", userRoutes);

// use error handler
app.use(errorHandler);

// testing db -- logs latest registy
// const logDB = async () => {
//   const tryDB = await pool.query("SELECT * FROM myinventory");
//   console.log(tryDB.rows[tryDB.rows.length - 1]);
// };
// logDB();

app.listen(port, () => {
  console.log(`### server is running on port: ${port}`);
});
