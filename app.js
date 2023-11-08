import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import routes from "./routes/router.js";
import csv_route from "./routes/Uploadcsv.js";
import db from "./database/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

db();
config();

app.use(cookieParser());
// Set up your routes
app.use("/api", routes);
app.use("/api", csv_route);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
