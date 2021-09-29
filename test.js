const beautifier = function (arr) {
    const lastItem = arr.pop();
    const arrString = arr.join(", ");
    return `${arrString}, ${lastItem}`
};

