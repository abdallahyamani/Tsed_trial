import { Property } from "@tsed/schema";

export class ProductRequest {

    @Property()
    productName: string;
    
    @Property()
    productPrice: number;

    @Property()
    supplierId: string;


}