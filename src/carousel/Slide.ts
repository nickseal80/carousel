import dispatcher from "../modules/EventDispatcher";
import Tape from "./Tape";

class Slide {
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

    }
}

export default Slide;