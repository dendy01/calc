import express, { request, response } from "express";

const app = express();
const port = 3000;

app.get("/", (request, response) => {
    response.send("Hello world");
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту http://localhost:${ port }`);
});