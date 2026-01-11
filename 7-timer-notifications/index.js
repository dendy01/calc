const { getTimeInMilliseconds } = require("./utils/timer.js");
const notifier = require("node-notifier");
const path = require("path");


if (process.argv.length <= 2) {
    console.log("Введите корректное время. Например: 1h 32m 12s");
} else {
    const time = process.argv.slice(2);

    setTimeout(() => {
        console.log("Подъём!!!");

        notifier.notify({
            title: "Подъём!!!",
            message: "Поднимайся моя красавица!!!",
            icon: path.join(`${ __dirname }/icons`, "AddressButton.svg")
        });
    }, getTimeInMilliseconds(time));
}