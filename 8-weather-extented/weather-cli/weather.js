#!/usr/bin/env node

import { getArgs } from "./utils/args.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { getWeather } from "./services/api.service.js";
import { getValueByKey, KEYS, saveValueByKey } from "./services/storage.service.js";
import { handlingError } from "./utils/handlingError.js";
import { getCurrentWeather } from "./utils/weather.js";

const getForcast = async () => {
    const apiKey = await getValueByKey(KEYS.apiKey);
    const city = await getValueByKey(KEYS.city);

    if (!apiKey) {
        printError("Отсутствует токен, пожалуйста, авторизуйтесь командой -t [API_KEY]");

        return;
    }

    if (!city) {
        printError("Отсутствует город, пожалуйста, сохраните город командой -s [CITY]");

        return;
    }

    try {
        const weather = await getWeather(apiKey, city);

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

        printWeather(currentWeather);
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

        return;
    }

    if (args.h) {
        printHelp();

        return;
    }

    if (args.t) {
        try {
            await saveValueByKey(KEYS.apiKey, args.t || "3c3c89550e3a518b73d3d3920e7cf5d6");

            printSuccess("Токен успешно сохранён");
        } catch (error) {
            printError(error);
        }

        return;
    }

    getForcast();
};

main();