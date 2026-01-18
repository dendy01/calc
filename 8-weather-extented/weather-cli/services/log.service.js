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
        -s [CITY] для установки города, либо -s [CITY] [CITY] [CITY] для установки городов
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
        -l [LANG] для установки языка (ru или en)
    `));
};

const printWeather = (weather, city) => {
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
            Город: ${ chalk.bgBlue(city) }
        📅 ${ chalk.bgCyan(now.toLocaleDateString('ru-RU', options)) }
        🌡️  Температура за окном: ${ weather.temp } °C
        💧 Влажность: ${ weather.humidity } %
        💨 Скорость ветра: ${ weather.windSpeed } м/с
        🌀 Порывы ветра: ${ weather.windGust } м/с
    `));
};

export { printSuccess, printError, printHelp, printWeather };