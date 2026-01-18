import chalk from "chalk";
import dedent from "dedent";

const printSuccess = (text) => {
    console.log(dedent(`
        ${ chalk.bgGreen(text) }
    `));
};

const printError = (text) => {
    console.log(dedent(`
        ${ chalk.bgRed(text) }
    `));
};

const printHelp = () => {
    console.log(dedent(`
        ${ chalk.bgBlue("HELP") }
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
    `));
};

const printWeather = (weather) => {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    console.log(dedent(`
        📅 ${ chalk.bgCyan(now.toLocaleDateString('ru-RU', options)) }
        🌡️  Температура за окном: ${ weather.temp } °C
        💧 Влажность: ${ weather.humidity } %
        💨 Скорость ветка: ${ weather.windSpeed } м/с
        🌀 Порывы ветра: ${ weather.windGust } м/с
    `));
};

export { printSuccess, printError, printHelp, printWeather };