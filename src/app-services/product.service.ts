import {Injectable} from "@tsed/di";
import { Inject } from "@tsed/di";
import { ProductModel } from "../models/ProductModel";
import { PRODUCT_REPOSITORY } from "../repositories/product.repository";
import { ProductResponse } from "src/dtos/response/product.response";
import { ProductRequest } from "src/dtos/request/product.request";

@Injectable()
export class ProductService {
    
    @Inject(PRODUCT_REPOSITORY)
    protected repository: PRODUCT_REPOSITORY
    
    async getAll(): Promise<ProductResponse[]> {
        return await this.repository.find();
    }

    async getById(id: string): Promise<ProductResponse| null> {
        return await this.repository.findOne({ where: { productId: id } });
    }

    async createProduct(product: ProductRequest): Promise<ProductResponse> {
        return await this.repository.save(product);
    }

    async update(id: string, product: ProductRequest): Promise<any> {
        return await this.repository.update(id, product);
    }

    async deleteProduct(id: string): Promise<any> {
        return await this.repository.delete(id);
    }

}

