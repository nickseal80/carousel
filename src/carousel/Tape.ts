import dispatcher from "../modules/EventDispatcher";
import Carousel from "./Carousel";
import Slide from "./Slide";

class Tape {
    private _carousel: Carousel;
    private _slides: Slide[];
    private readonly _element: HTMLDivElement;

    get carousel(): Carousel {
        return this._carousel;
    }

    get element(): HTMLDivElement {
        return this._element;
    }

    constructor(carousel: Carousel, slides: HTMLElement[]) {
        this._element = this.createTapeElement();
        carousel.element.appendChild(this._element);

        this.initSlides(slides);

        dispatcher.on('navBtnClick', (data) => {
            console.log(data);
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
        return tape;
    }
}

export default Tape;