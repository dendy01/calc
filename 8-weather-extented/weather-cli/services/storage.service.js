import { promises, constants } from "fs";
import path from "path";

const root = path.join(path.resolve(), "weather-data.json");
const KEYS = {
    apiKey: "apiKey",
    city: "city",
    lang: "lang"
};

const saveValueByKey = async (key, value) => {
    let store = {};

    if (await isExist(root)) {
        const file = await promises.readFile(root, "utf8");
        store = JSON.parse(file);
    }

    store[key] = value;
    await promises.writeFile(root, JSON.stringify(store));
};

const getValueByKey = async (key) => {
    const store = await isExist(root) && await promises.readFile(root, "utf8");

    return JSON.parse(store)[key];
};

const isExist = async (root) => {
    try {
        await promises.access(root, constants.F_OK);

        return true;
    } catch {
        return false;
    }
}

export { KEYS, saveValueByKey, getValueByKey };