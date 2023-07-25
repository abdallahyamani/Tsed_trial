import {Injectable} from "@tsed/di";
import { Inject } from "@tsed/di";
import { SupplierModel } from "../models/SupplierModel";
import { SUPPLIER_REPOSITORY } from "../repositories/supplier.repository";
import { SupplierRequest } from "src/dtos/request/supplier.request";
import { SupplierResponse } from "src/dtos/response/supplier.response";

@Injectable()
export class SupplierService {
    @Inject(SUPPLIER_REPOSITORY)
    protected repository: SUPPLIER_REPOSITORY
    
    async getAll(): Promise<SupplierResponse[]> {
        return await this.repository.find();
    }

    async getById(id: string): Promise<SupplierResponse | null> {
        return await this.repository.findOne({ where: { id: id } });
    }

    async create(supplier: SupplierRequest): Promise<SupplierResponse> {
        return await this.repository.save(supplier);
    }

    async update(id: string, supplier: SupplierRequest): Promise<any> {
        return await this.repository.update(id, supplier);
    }

    async delete(id: string): Promise<any> {
        return await this.repository.delete(id);
    }


}