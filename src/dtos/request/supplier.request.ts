import { Property } from "@tsed/schema";

export class SupplierRequest {

    @Property()
    supplierName: string;

    @Property()
    supplierPhone: string;

}