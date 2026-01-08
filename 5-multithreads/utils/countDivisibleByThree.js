const countDivisibleByThree = (array) => {
    let countNumber = 0;

    array.forEach((item) => {
        if (item % 3 === 0) {
            countNumber += 1;
        }
    });

    return countNumber;
}

module.exports = { countDivisibleByThree };