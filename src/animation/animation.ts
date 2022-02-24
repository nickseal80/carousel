export type Timing = (timeFraction: number) => number;
export type Draw = (progress: number) => number;
export type AnimationData = {
    timing: Timing;
    draw: Draw;
    duration: number;
}

export const animate = (data: AnimationData) => {
    let start = performance.now();

    requestAnimationFrame(function animate(time): void {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / data.duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        let progress = data.timing(timeFraction);

        data.draw(progress); // отрисовать её

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}