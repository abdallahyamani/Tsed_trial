import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import { SupplierModel } from './SupplierModel';

@Entity()
export class ProductModel {
  
  @PrimaryGeneratedColumn()
  productId: string;
  
  @Column()
  productName: string;

  @Column()
  productPrice: number;

/*  @ManyToOne((type) => SupplierModel, (supplier: SupplierModel) => supplier.id)
  @JoinColumn()
  supplierId: string;
*/

  @ManyToOne(() => SupplierModel, (supplier: SupplierModel) => supplier.id)
  @JoinColumn({ name: "supplierId" })
  supplier: SupplierModel;

@Column()
supplierId: string;

  //@Column()
  @CreateDateColumn()
  createdAt: Date;

  //@Column()
  @UpdateDateColumn()
  updatedAt: Date;
  
}
