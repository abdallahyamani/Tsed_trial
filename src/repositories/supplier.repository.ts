import { registerProvider } from "@tsed/di";
import { PostgresDataSource } from "../datasources/PostgresDatasource";
import { SupplierModel } from "../models/SupplierModel";
import { getRepository, Repository } from "typeorm";

export const SupplierRepository = PostgresDataSource.getRepository(SupplierModel);


export const SUPPLIER_REPOSITORY = Symbol.for("SupplierRepository");
export type SUPPLIER_REPOSITORY = typeof SupplierRepository;

registerProvider({
    provide: SUPPLIER_REPOSITORY,
    useValue: SupplierRepository
});
