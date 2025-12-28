if (process.argv.length === 5) {
    const EventEmitter = require("events");

    const emitter = new EventEmitter();

    const firstNumber = process.argv[2];
    const secondNumber = process.argv[3];
    const method = process.argv[4];

    const result = require(`./utils/${ method }.js`);

    emitter.addListener(method, (a, b) => {
        emitter.emit("result", result[method](a, b));
    });

    emitter.on("result", (result) => {
        console.log(result);
    });
    
    emitter.emit(method, +firstNumber, +secondNumber);
} else {
    console.log("Неверный формат REPL");
}