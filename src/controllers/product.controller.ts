import { Request, Response, response } from "express";
import AppDataSource from "../connection";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";

class productController {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  findAll = async (req: Request, res: Response): Promise<Response> => {
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();

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

  findOne = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;

    const productRepository = AppDataSource.getRepository(Product);
    console.log(id);

    const product = await productRepository.findOneBy({ id });

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    return res.status(200).send({ data: product });
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;
    const { name, description } = req.body;
    const productRepository = AppDataSource.getRepository(Product);

    try {
      const product = await productRepository.findOneByOrFail({ id });

      product.name = name;
      product.description = description;

      const productDb = await productRepository.save(product);

      return res.status(200).send({ data: productDb });
    } catch (error) {
      return res.status(404).send({ error: "Product not found" });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const id: string = req.params.id;

    const productRepository = AppDataSource.getRepository(Product);

    try {
      await productRepository.delete({ id });
      return res.status(204).send({});
    } catch (error) {
      return res.status(400).send({ error: "Product not found" });
    }
  };
}

export default new productController();
