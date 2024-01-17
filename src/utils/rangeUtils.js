export const oscillateBetween = (minRange, maxRange, step = 5) => {
    return (currValue) => {
        if (currValue < minRange || currValue > maxRange)
            step *= -1;

        return currValue + step;
    };
};


export const createRange = (length, midPoint = 0) => {
    const halfLength = length / 2;
    return [midPoint - halfLength, midPoint + halfLength];
}