const getTimeInMilliseconds = (time) => {
    let hourse = 0;
    let minutes = 0;
    let seconds = 0;

    time.forEach((item) => {
        const lastSymbol = item.at(-1);
        const number = Number(item.slice(0, -1));

        if (lastSymbol === "h") {
            hourse = number;
        }

        if (lastSymbol === "m") {
            minutes = number;
        }

        if (lastSymbol === "s") {
            seconds = number;
        }
    });

    return (hourse * 3600 + minutes * 60 + seconds) * 1000;
};

module.exports = { getTimeInMilliseconds };