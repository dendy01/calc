#!/usr/bin/env node

import { getArgs } from "./utils/args.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { getWeather } from "./services/api.service.js";
import { getValueByKey, KEYS, saveValueByKey } from "./services/storage.service.js";
import { handlingError } from "./utils/handlingError.js";
import { getCurrentWeather } from "./utils/weather.js";

const apiKey = await getValueByKey(KEYS.apiKey);
const city = await getValueByKey(KEYS.city);
const lang = await getValueByKey(KEYS.lang);

const getForcast = async (city) => {
    if (!apiKey) {
        printError("Отсутствует токен, пожалуйста, авторизуйтесь командой -t [API_KEY]");

        return;
    }

    if (!city) {
        printError("Отсутствует город, пожалуйста, сохраните город командой -s [CITY]");

        return;
    }

    try {
        const weather = await getWeather(apiKey, city, lang || '');

        if (Number(weather.cod) !== 200) {
            throw weather;
        }

        const weatherList = [];

        weather.list.forEach((item, index, array) => {
            const weatherItem = {
                time: item.dt_txt,
                humidity: item.main.humidity,
                temp: item.main.temp,
                windSpeed: item.wind.speed,
                windGust: item.wind.gust
            }

            weatherList.push(weatherItem);
        });

        const currentWeather = getCurrentWeather(weatherList);

        printWeather(currentWeather, city);
    } catch(error) {
        handlingError(error);
    }
};

const main = async () => {
    const args = getArgs(process.argv);

    if (args.s) {
        try {
            await saveValueByKey(KEYS.city, args.s);

            printSuccess("Город успешно сохранён");
        } catch (error) {
            printError(error);
        }
    }

    if (args.h) {
        printHelp();
    }

    if (args.t) {
        try {
            await saveValueByKey(KEYS.apiKey, args.t || "3c3c89550e3a518b73d3d3920e7cf5d6");

            printSuccess("Токен успешно сохранён");
        } catch (error) {
            printError(error);
        }
    }

    if (args.l) {
        console.log(args.l);

        try {
            await saveValueByKey(KEYS.lang, args.l);

            printSuccess("Язык успешно сохранён");
        } catch (error) {
            printError(error);
        }
    }

    if (args.print) {
        if (city.length) {
            city.forEach((item) => {
                getForcast(item);
            })
        } else {
            getForcast(city);
        }
    }
};

main();