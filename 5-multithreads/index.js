const os = require("os");
const { countDivisibleByThree } = require("./utils/countDivisibleByThree.js");
const { Worker } = require("worker_threads");

const main = async () => {
    const array = [];
    let count = 1;

    for (let i = 0; i < 300000; i += 1) {
        array[i] = count;
        count += 1;
    }

    const linearStart = performance.now();

    console.log("Результат от прямого вычисления: ", countDivisibleByThree(array));

    const linearEnd = performance.now();
    const linearTime = linearEnd - linearStart;

    const parallelStart = performance.now();
    const numberCores = os.cpus().length;
    const numberElementsPerCore = array.length / numberCores;

    let result = 0;
    let startSliceArray = 0;
    let endSliceArray = numberElementsPerCore;

    const workerPromises = [];

    for (let i = 1; i <= numberCores; i += 1) {
        const sliceArray = array.slice(startSliceArray, endSliceArray);

        workerPromises.push(new Promise((resolve) => {
            const worker = new Worker("./utils/worker.js");
            
            worker.postMessage(sliceArray);
            
            worker.on("message", (data) => {
                result += data;

                worker.terminate();
                resolve();
            });
            
            worker.on("error", (error) => {
                console.error(`Воркер ${ i } ошибся:`, error);
                resolve();
            });
        }));


        startSliceArray = endSliceArray;
        endSliceArray = startSliceArray + numberElementsPerCore;
    }

    await Promise.all(workerPromises).then(() => {
        console.log("Результат от worker threads: ", result);
    });

    const parallelEnd = performance.now();
    const parallelTime = parallelEnd - parallelStart;
    

    console.log(`Линейный подход: ${ linearTime.toFixed(2) } мс`);
    console.log(`Многопоточный подход: ${ parallelTime.toFixed(2) } мс`);
};

main();