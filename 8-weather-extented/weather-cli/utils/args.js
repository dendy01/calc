export const getArgs = (args) => {
    const result = {};
    const params = args.slice(2);

    for (let i = 0; i < params.length; i++) {
        const item = params[i];
        
        if (item[0] === "-") {
            const key = item.substring(1);
            const nextItems = [];
            
            let nextIndex = i + 1;
            
            while (nextIndex < params.length && params[nextIndex][0] !== "-") {
                nextItems.push(params[nextIndex]);
                nextIndex++;
            }
            
            if (nextItems.length === 0) {
                result[key] = true;
            } else if (nextItems.length === 1) {
                result[key] = nextItems[0];
            } else {
                result[key] = nextItems;
            }
            
            i = nextIndex - 1;
        }
    }

    return result;
};