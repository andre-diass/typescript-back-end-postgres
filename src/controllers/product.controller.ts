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
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();

    return res.status(200).send({ data: [products] });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const product = new Product();
    product.name = name;
    product.description = description;

    const productRepository = await AppDataSource.getRepository(Product);
    const productDb = await productRepository.save(product);

    return res.status(201).send({ data: productDb });
  }
}

export default new productController();
