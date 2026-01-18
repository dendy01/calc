import { printError } from "../services/log.service.js";

export const handlingError = (error) => {
    switch (Number(error.cod)) {
        case 401:
            printError("Пожалуйста авторизуйтесь -t [API_KEY]");
            break;
        case 404:
            printError("Данный город не найден");
            break;
    }
};