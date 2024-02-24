import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ChatRoutes } from "./routes/index.js";

const jsonParser = bodyParser.json();

const app = express();
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/chat", ChatRoutes);

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log("Server is listening at port:", port);
});
