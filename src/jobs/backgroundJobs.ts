import { Inject, Service } from "@tsed/di";
import { Queue } from "bull";
import { create } from "domain";
import { ProductService } from "src/app-services/product.service";
import { ProductController } from "src/controllers/rest";
import { QueueService } from "src/services/queue.service";

@Service()
export class BackgroundJobs {

    @Inject(ProductService)
    protected productservice: ProductService

    @Inject(QueueService)
    protected queueservice: QueueService
    createProduct: Queue
    deleteProduct: Queue



    $onInit() {
        this.createProduct = QueueService.createProduct;
        this.deleteProduct = QueueService.deleteProduct;
        this.initializeJobs();
        this.boot()
    }



    async initializeJobs() {
        this.createProduct.process(async (job) => {
            await this.productservice.createProduct(job.data.product)
        })

        this.deleteProduct.process(async (job) => {
            await this.productservice.deleteProduct(job.data.productid)
        })

    }

    // using boot()
    boot() {
        this.createProduct.on('completed', () => {
            console.log("Product created");
        })

        this.deleteProduct.on('completed', () => {
            console.log("Product dlted");

        })
        
    }

}