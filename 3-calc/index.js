if (process.argv.length === 5) {
    const firstNumber = process.argv[2];
    const secondNumber = process.argv[3];
    const method = process.argv[4];

    const result = require(`./utils/${ method }.js`);

    console.log(result[method](+firstNumber, +secondNumber));
} else {
    console.log("Неверный формат REPL");
}