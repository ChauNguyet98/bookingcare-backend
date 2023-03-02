import express from "express";
import configViewEngine from "./configs/view-engine";
import initApiRoute from "./route/api";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// configure to send data from client to server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initApiRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
