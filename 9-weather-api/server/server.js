import cors from "cors";
import express from "express";
import { weatherRouter } from "./weather/weather.js";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/weather", weatherRouter);

app.listen(port, () => {
    console.log(`Сервер запущен на порту http://localhost:${ port }`);
});