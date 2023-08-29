import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./connection";
import productController from "./controllers/product.controller";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());

app.get("/api/products", productController.findAll);
app.post("/api/products", productController.create);

app.get("/", (req, res) => {
  res.send("server up 2");
});

app.listen(PORT, () => {
  console.log(`server running in port  ${PORT}`);
});
