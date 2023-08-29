import { Request, Response } from "express";
import AppDataSource from "../connection";
import { Product } from "../entities/product.entity";

class productController {
  async findAll(req: Request, res: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();

    return res.status(200).send({ data: [products] });
  }
}

export default new productController();
