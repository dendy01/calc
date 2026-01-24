const app = document.querySelector(".app");

const inputCity = document.querySelector(".input-city");
const inputApiKey = document.querySelector(".input-api--key");
const inputLang = document.querySelector(".input-lang");

const button = document.querySelector(".button");

const config = {
    url: "http://localhost:3000",
    get_weather: "weather/get-weather"
};

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

button.addEventListener("click", async () => {
    const apikey = localStorage.getItem("apiKey") || "3c3c89550e3a518b73d3d3920e7cf5d6";
    const lang = localStorage.getItem("lang") || "ru";

    if (inputCity.value) {
        try {
            const response = await fetch(`${ config.url }/${ config.get_weather }`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    apiKey: inputApiKey.value || apikey,
                    lang: inputLang.value || lang,
                    city: inputCity.value
                })
            });

            const weather = await response.json();
            const listWeather = weather.list;

            const div = document.createElement("div");
            div.classList.add("weather-map");

            const ul = document.createElement("ul");
            ul.classList.add("weather-list");

            listWeather.forEach((item) => {
                const li = document.createElement("li");
                li.classList.add("weather-list__item");

                const itemWeather = {
                    date: item.dt_txt,
                    temp: item.main.temp,
                    humidity: item.main.humidity,
                    icon: item.weather[0].icon,
                    description: item.weather[0].description,
                }

                const descriptionWeather = {
                    date: (value) => `📅 Сегодня: ${ value }`,
                    temp: (value) => `🌡️ Температура: ${ value } °C`,
                    humidity: (value) => `💧 Влажность: ${ value } %`,
                    description: (value) => `Описание: ${ value }`,
                }

                for (const value in itemWeather) {
                    const p = document.createElement("p");
                    p.classList.add("text");

                    if (value === "icon") {
                        const img = document.createElement("img");

                        img.src = `http://openweathermap.org/img/wn/${ itemWeather[value] }@2x.png`;

                        p.append(img);
                    } else if (value === "description") {
                        p.textContent = descriptionWeather[value](itemWeather[value]);
                    } else {
                        p.textContent = descriptionWeather[value](itemWeather[value]);
                    }

                    li.append(p);
                }

                ul.append(li);
            })

            const h2 = document.createElement("h2");
            h2.classList.add("title");
            h2.textContent = inputCity.value;

            div.append(h2);
            div.append(ul);
            app.append(div);

        } catch (error) {
            console.log(error);
        } finally {
            inputCity.value = "";
            inputApiKey.value = "";
            inputLang.value = "";
        }
    } else {
        inputCity.blur();
    }
});