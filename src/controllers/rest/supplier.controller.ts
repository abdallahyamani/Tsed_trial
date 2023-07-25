import {BodyParams, Controller, Inject, PathParams} from "@tsed/common";
import {Delete, Get,Post,Put,Returns} from "@tsed/schema";
import { SupplierService } from "src/app-services/supplier.service";
import { SupplierRequest } from "src/dtos/request/supplier.request";
import { SupplierResponse } from "src/dtos/response/supplier.response"

@Controller("/supplier")
export class SupplierController {

  @Inject(SupplierService)
  protected service: SupplierService;

  @Get("/:supplierId")
  @Returns(200, Array).Of(SupplierResponse)
  public async getSupplier(@PathParams('supplierId') supplierId: string): Promise<SupplierResponse | null> {
    try {
      return await this.service.getById(supplierId);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Delete("/:supplierId")
  delete(@PathParams("supplierId") supplierId: string): Promise<SupplierResponse> {
    return this.service.delete(supplierId);
  }

  @Put("/:supplierId")
  public async update(

    @PathParams("supplierId") id: string,
    @BodyParams() newSupplier: SupplierRequest): Promise<SupplierResponse> {
    try {
      let supplier = await this.service.getById(id);

      if (!supplier) {
        throw new Error("Supplier not found");
      }

      // Update the properties of the existing product with the new values
      supplier.supplierName = newSupplier.supplierName;
      supplier.supplierPhone = newSupplier.supplierPhone;

      const updatedSupplier = await this.service.update(id, supplier);
      return updatedSupplier;
    }
    catch (error) {
      throw new Error(error);
    }
  }

  @Post("/")
  public async create(
    @BodyParams() supplier: SupplierRequest): Promise<SupplierResponse> {
    const createdSupplier = await this.service.create(supplier);

    return createdSupplier;
  }

}
