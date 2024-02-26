import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { appRouter } from "./modules/index.router.js";
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(
  `${process.env.BASEURL}/upload`,
  express.static(path.join(__dirname, "./upload"))
);
// app.use(express.urlencoded({ extended: false }));
app.use(cors());
const port = process.env.PORT;
appRouter(app);
app.listen(port, () => console.log(`server running on port >>>> ${port}`));
