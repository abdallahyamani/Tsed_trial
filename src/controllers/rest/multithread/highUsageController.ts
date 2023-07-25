import { Controller, Get } from "@tsed/common";
//import { Worker, isMainThread, parentPort } from "worker_threads";
import { doMultiplier } from './highUsage';
const { Worker, isMainThread, parentPort } = require('node:worker_threads');

@Controller("/multithread")
export class highUsageController {
  @Get("/noWorker")
     withoutWorker() {

    //  const result = doMultiplier();
    // return doMultiplier();
    // await delay(30000)
    // doMultiplier()
    
      let x = doMultiplier() 
      console.log(x)
      console.log(" Running high CPU task without worker threads...")

  }

  @Get("/withWorker")
   async withWorker()
   { 
      //await delay(30000)
    if (isMainThread) {
      const worker = new Worker("../hwExercise/src/controllers/rest/multithread/highUsage.ts");

      //console.log("Running high CPU task with worker threads...");
      worker.postMessage('STARTING MULTIPY!');
      worker.once("message", (message:any) => {
        console.log(message);
      });
    } 
   }
}


