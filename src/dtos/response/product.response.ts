import { Property } from '@tsed/schema';
import { ProductModel } from '../../models/ProductModel';

export class ProductResponse implements Partial< ProductModel > {

    @Property()
    productId: string;
    
    @Property()
    productName: string;

    @Property()
    productPrice: number;

    @Property()
    supplierId: string;

    @Property()
    createdAt: Date;

    @Property()
    updatedAt: Date;

}