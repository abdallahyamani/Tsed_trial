import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';

@Entity()
export class SupplierModel {
  
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column()
  supplierName: string;

  @Column()
  supplierPhone: string;

  //@OneToMany(() => ProductModel, (product) => product.supplier)
  //supplier: SupplierModel[]
  
}
