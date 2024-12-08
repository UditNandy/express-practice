import express from "express";
import db from "../config/db.js";
import router from "./router.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 3200;

app.use("/", router);

db.getConnection().then((connection) => {
  console.log(`Conncection established with db successfully`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
