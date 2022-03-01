const makeEaseOut = (timing: (timeFraction: number) => any) => {
    return (timeFraction: number) => {
        return 1 - timing(1 - timeFraction);
    }
}

export const linear = (timeFraction: number) => {
    return timeFraction;
}

export const quad = (timeFraction: number) => {
    return Math.pow(timeFraction, 2);
}

export const circ = (timeFraction: number) => {
    return 1 - Math.sin(Math.acos(timeFraction));
}

export const back = (x: number = 1.5, timeFraction: number) => {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

export const bounce = (timeFraction: number) => {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
}

export const quadEaseOut = makeEaseOut(quad);

export const circEaseOut = makeEaseOut(circ);

export const bounceEaseOut = makeEaseOut(bounce);

export const timing = {
    linear,
    quad,
    circ,
    back,
    bounce,
    quadEaseOut,
    circEaseOut,
    bounceEaseOut,
};

