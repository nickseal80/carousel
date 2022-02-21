import dispatcher from "../modules/EventDispatcher";
import Tape from "./Tape";
import {Config} from "../interfaces/Config";

class Slide {
    public width: number;

    private readonly _tape: Tape;
    private readonly _element: HTMLElement;

    get tape(): Tape {
        return this._tape;
    }

    get element(): HTMLElement {
        return this._element;
    }

    constructor(tape: Tape, slideElement: HTMLElement) {
        this._tape = tape;
        this._element = slideElement;

        this.init();
    }

    init = () => {
        this._tape.element.appendChild(this.element);
        this.setInlineStyles();
    }

    setInlineStyles = () => {
        const config = this.tape.carousel.config;
        let width: number;

        console.log(getComputedStyle(this.element).width);
        if (config.itemWidth) {
            width = config.itemWidth;
        } else {
            width = this.element.getBoundingClientRect().width;
        }

        this.width = width;

        this.element.style.minWidth = `${width}px`;
    }
}

export default Slide;