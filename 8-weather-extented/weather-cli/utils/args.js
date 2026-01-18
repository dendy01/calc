export const getArgs = (args) => {
    const result = {};
    const params = args.slice(2);

    params.forEach((item, index, array) => {
        if (!array[index + 1]) {
            result[item.substring(1)] = true;

            return;
        }

        if (item[0] === "-" && array[index + 1][0] !== "-") {
            result[item.substring(1)] = array[index + 1];
        } else {
            result[item.substring(1)] = true;
        }
    });

    return result;
};