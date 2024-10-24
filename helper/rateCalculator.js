const rates = {
    Cycle: { day: 20, week: 100, month: 350 },
    Motorcycle: { day: 40, week: 200, month: 700 },
    Car: { day: 60, week: 300, month: 1050 },
};

module.exports = (vehicleType, days) => {
    const months = Math.floor(days / 30);
    const weeks = Math.floor((days % 30) / 7);
    const remainingDays = days % 7;

    const totalRate =
        months * rates[vehicleType].month +
        weeks * rates[vehicleType].week +
        remainingDays * rates[vehicleType].day;

    return totalRate;
};
