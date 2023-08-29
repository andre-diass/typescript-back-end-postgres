import { Request, Response } from "express";
import AppDataSource from "../connection";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";

class productController {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    //const productRepository = AppDataSource.getRepository(Product);

    const products = await this.productRepository.find();

    return res.status(200).send({ data: [products] });
  }
}

export default new productController();
