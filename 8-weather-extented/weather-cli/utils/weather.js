export const getCurrentWeather = (weatherList) => {
    let date = (new Date()).toLocaleString();
    date = date.split(",");

    const reverseDate = date[0].split(".").reverse().join("-");
    const currentTime = date[1];
    const currentHour = Number(currentTime.split(":")[0]);

    const currentWeatherList = weatherList.filter((item) => reverseDate === item.time.split(" ")[0]);
    
    let closestWeather = null;
    let minDiff = Infinity;

    currentWeatherList.forEach((item) => {
        const itemHour = Number(item.time.split(" ")[1].split(":")[0]);
        const diff = Math.abs(currentHour - itemHour);
        
        if (diff < minDiff) {
            minDiff = diff;
            closestWeather = item;
        }
    });

    return closestWeather;
};