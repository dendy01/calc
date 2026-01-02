const { getTimeInMilliseconds } = require("./utils/timer.js");

if (process.argv.length <= 2) {
    console.log("Введите корректное время. Например: 1h 32m 12s");
} else {
    const time = process.argv.slice(2);

    setTimeout(() => {
        console.log("Подъём!!!");
    }, getTimeInMilliseconds(time));
}