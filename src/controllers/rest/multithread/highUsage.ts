const { parentPort } = require('node:worker_threads');

export function doMultiplier() {
    let count = 1
    for (let i= 1; count <= 999999999999999; i++ ) 
    {
        // console.log(count)
        count *= i
    }
   
    parentPort.postMessage(count)
}
parentPort?.on('message', (message:any) => {
  console.log(message)
  doMultiplier()
});




// export function delay(time: number) {
//         return new Promise((resolve) => {
//           setTimeout(resolve, time);
//         });
    
