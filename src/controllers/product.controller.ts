import { Request, Response } from "express";
import AppDataSource from "../connection";
import { Product } from "../entities/product.entity";

class productController {
  findAll(req: Request, res: Response): Response {
    const productRepository = AppDataSource.getRepository(Product);

    const products = productRepository.find();

    return res.status(200).send({ data: [products] });
  }
}

export default new productController();
