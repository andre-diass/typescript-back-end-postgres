import express from "express";
import "module-alias/register";
import dotenv from "dotenv";
dotenv.config();
import "./connection";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`server running in port  ${PORT}`);
});
