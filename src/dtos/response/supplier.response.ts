import { Property } from '@tsed/schema';
import { SupplierModel } from 'src/models/SupplierModel';

export class SupplierResponse implements SupplierModel {

    @Property()
    id: string;

    @Property()
    supplierName: string;

    @Property()
    supplierPhone: string;

}