import dispatcher from "../modules/EventDispatcher";
import Carousel from "./Carousel";
import Slide from "./Slide";

class Tape {
    private readonly _carousel: Carousel;
    private readonly _element: HTMLDivElement;
    private _slides: Slide[]; //?
    private _position: number;

    get carousel(): Carousel {
        return this._carousel;
    }

    get element(): HTMLDivElement {
        return this._element;
    }

    get position(): number {
        return this._position;
    }

    set position(value: number) {
        this._position = value;
        dispatcher.trigger('changeTapePosition', {position: value})
    }

    constructor(carousel: Carousel, slides: HTMLElement[]) {
        this._element = this.createTapeElement();
        this._carousel = carousel;
        carousel.element.appendChild(this._element);

        this.initSlides(slides);

        dispatcher.on('navBtnClick', (evt) => {
            if (evt.data.direction === 'next') {
                this.position = -10;
            } else if (evt.data.direction === 'prev') {
                this.position = 0;
            }
        });
    }

    initSlides = (slides: HTMLElement[]) => {
        Array.prototype.forEach.call(slides, slideElement => {
            new Slide(this, slideElement)
        });
    }



    private createTapeElement = (): HTMLDivElement => {
        const tape = document.createElement('div');
        tape.classList.add('seal-carousel_tape');
        dispatcher.on('changeTapePosition', (evt) => {
            tape.style.left = `${evt.data.position}px`;
        });

        return tape;
    }
}

export default Tape;