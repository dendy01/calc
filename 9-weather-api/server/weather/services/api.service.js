const getWeather = async (apiKey, city, lang = "ru") => {
    const url = new URL("https://api.openweathermap.org/data/2.5/forecast");

    url.searchParams.append("q", city);
    url.searchParams.append("appid", apiKey);
    url.searchParams.append("units", "metric");
    url.searchParams.append("lang", lang);

    const response = await fetch (url);
    const data = await response.json();

    return data;
};

export { getWeather };