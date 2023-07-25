import { registerProvider } from "@tsed/di";
import { PostgresDataSource } from "../datasources/PostgresDatasource";
import { getRepository, Repository } from "typeorm";
import { ProductModel } from "../models/ProductModel";

export const ProductRepository = PostgresDataSource.getRepository(ProductModel);


export const PRODUCT_REPOSITORY = Symbol.for("ProductRepository");
export type PRODUCT_REPOSITORY = typeof ProductRepository;

registerProvider({
    provide: PRODUCT_REPOSITORY,
    useValue: ProductRepository
});
