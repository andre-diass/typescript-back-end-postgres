import productController from "@/controllers/product.controller";
import { Router } from "express";
import { Request, Response } from "express";

const routes = Router();

routes.get("/api/products", productController.findAll);
routes.get("/api/products/:id", productController.findOne);
routes.post("/api/products", productController.create);
routes.put("/api/products/:id", productController.update);
routes.delete("/api/products/:id", productController.delete);

routes.get("/", (_: Request, res: Response) => {
  res.status(200).send("server is up");
});

routes.get("*", (_: Request, res: Response) => {
  res.status(404).send({ error: "Not found" });
});

export default routes;
