import { Request, Response } from "express";
import AppDataSource from "../connection";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";

class productController {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  findAll = async (req: Request, res: Response): Promise<Response> => {
    //const productRepository = AppDataSource.getRepository(Product);

    const products = await this.productRepository.find();

    return res.status(200).send({ data: [products] });
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { name, description } = req.body;

    const product = new Product();
    product.name = name;
    product.description = description;

    //const productRepository = await AppDataSource.getRepository(Product);
    const productDb = await this.productRepository.save(product);

    return res.status(201).send({ data: productDb });
  };
}

export default new productController();
