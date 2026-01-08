const { parentPort } = require("worker_threads");
const { countDivisibleByThree } = require("./countDivisibleByThree");

parentPort.on("message", (array) => {
    parentPort.postMessage(countDivisibleByThree(array));
    parentPort.close();
});