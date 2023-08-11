import { BodyParams, Controller, Inject, PathParams } from "@tsed/common";
import { Delete, Get, Post, Put, Returns } from "@tsed/schema";
import { ProductService } from "src/app-services/product.service";
import { ProductRequest } from "src/dtos/request/product.request";
import { ProductResponse } from "src/dtos/response/product.response";
import { QueueService } from "src/services/queue.service";

@Controller("/product")
export class ProductController {

  @Inject(ProductService)
  protected service: ProductService;

  @Get("/:productId")
  @Returns(200, Array).Of(ProductResponse)
  public async getProduct(@PathParams('productId') productId: string): Promise<ProductResponse | null> {
    try {
      return await this.service.getById(productId);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Delete("/:productId")
  delete(@PathParams("productId") productId: string): Boolean {
    //return this.service.deleteProduct(productId);
    // Enqueue a job to dlt the product in the "deleteProduct" queue
    try {
      QueueService.deleteProduct.add({
        productid: productId

      })
      return true;
    } catch (error) {
      return false;
    }

  }

  /*  @Put("/:productId")
    update(@PathParams('id') id : string, product: ProductModel) {
      return this.service.update(id, product);
    }  
  */
  @Put("/:productId")
  public async update(

    @PathParams("productId") productId: string,
    @BodyParams() newProduct: ProductRequest): Promise<ProductResponse> {
    try {
      let product = await this.service.getById(productId);

      if (!product) {
        throw new Error("Product not found");
      }

      // Update the properties of the existing product with the new values
      product.productName = newProduct.productName;
      product.productPrice = newProduct.productPrice;
      product.supplierId = newProduct.supplierId;

      const updatedProduct = await this.service.update(productId, product);
      return updatedProduct;
    }
    catch (error) {
      throw new Error(error);
    }
  }

  @Post("/")
  create(
    @BodyParams() product: ProductRequest): Boolean {

    try {



      // Enqueue a job to create the product in the "createProduct" queue
      QueueService.createProduct.add({
        product: product
      })
      return true
    } catch (error) {
      return false
    }
  }
}
