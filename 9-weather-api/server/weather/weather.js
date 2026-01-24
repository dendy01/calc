import { getWeather } from "./services/api.service.js";
import express from "express";

const weatherRouter = express.Router();

weatherRouter.post("/get-weather", async (request, response) => {
    if (!request.body) {
        response.status(400).send("Тело запроса отсутствует!");
    }
    
    const city = request.body.city;
    const apiKey = request.body.apiKey;
    const lang = request.body.lang;
    const weather = await getWeather(apiKey, city, lang);

    console.log(weather);

    if (weather.cod === "401" || weather.cod === 401) {
        response.status(401).send(JSON.stringify({
            error: "Неверный api key, пожалуйста получите api key на сайте https://openweathermap.org/"
        }));
    }

    if (weather.cod === "404" || weather.cod === 404) {
        response.status(404).send(JSON.stringify({
            error: "Город не найден"
        }));
    }

    response.send(JSON.stringify(weather));
});

export { weatherRouter };