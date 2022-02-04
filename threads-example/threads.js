const { Worker, isMainThread, workerData } = require("worker_threads");

if (isMainThread) {
  console.log(`main thread process ${process.pid}`);
  new Worker(__filename, {
    workerData: [1, 2, 3, 34],
  });
  new Worker(__filename, {
    workerData: [45, 2, 90, 12],
  });
} else {
  console.log(`worker process ${process.pid}`);
  console.log(`${workerData} sorted is ${workerData.sort()}`);
}
