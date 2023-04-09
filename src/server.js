import cors from "cors";
import express from "express";
import initApiRoute from "./route/api";
import configViewEngine from "./configs/view-engine";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// configure to send data from client to server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

configViewEngine(app);
initApiRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
