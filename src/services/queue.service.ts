import { Service } from "@tsed/di";
import Bull from "bull";


// Define the Redis connection options
 const _connectionOpts: any = {
    pkg: "ioredis",
    host: process.env.REDIS_URL,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    port: process.env.REDIS_PORT,
    database: process.env.REDIS_DATABASE,
    options: { password: process.env.REDIS_PASSWORD }
  };


/**
 * Service to create queues and connect them to redis
 */
@Service()
export class QueueService {

    public static createProduct: Bull.Queue;
    public static deleteProduct: Bull.Queue;


    $onInit() {
        QueueService.createProduct = new Bull("createProduct", { redis: _connectionOpts })
        QueueService.deleteProduct = new Bull("deleteProduct", { redis: _connectionOpts })

    }

    
}
