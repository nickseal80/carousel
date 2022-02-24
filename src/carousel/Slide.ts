import Tape from "./Tape";

class Slide {
    public width: number;

    private readonly _element: HTMLElement;

    get element(): HTMLElement {
        return this._element;
    }

    constructor(slideElement: HTMLElement) {
        this._element = slideElement;
    }

    init = (tape: Tape) => {
        tape.element.appendChild(this.element);
    }
}

export default Slide;