function getDateTime(dt, tm){
    let date = dt.replace(/[-\/_]/g, '');
    return `${date}-${tm}`;
}

console.log(getDateTime('2022-32-43'))