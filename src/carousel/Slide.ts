import Tape from "./Tape";
import {store} from "../index";
import {Axis} from "../interfaces/Axis";
import carouselActionTypes from "../store/carousel/actionTypes";
import tapeActionTypes from "../store/tape/actionTypes";
import {updateSlide} from "../store/slides/actions";

class Slide {
    public visible: boolean = false;
    public axis: Axis;
    public alignableLeft: boolean = false;
    public alignableRight: boolean = false;

    private readonly _element: HTMLElement;
    private _order: number;

    get element(): HTMLElement {
        return this._element;
    }

    get order(): number {
        return this._order;
    }

    constructor(slideElement: HTMLElement) {
        this._element = slideElement;
    }

    init = (tape: Tape, order: number) => {
        this.element.classList.add('tape-slide')
        tape.element.appendChild(this.element);
        this._order = order;

        store.subscribe((type: string) => {
            if (type === tapeActionTypes.UPDATE_POSITION) {
                this.update();
            }
        });
    }

    update = () => {
        const domRect = this.element.getBoundingClientRect();
        this.axis = {
            width: domRect.width,
            height: domRect.height,
            posX: domRect.x,
            posY: domRect.y,
            left: domRect.left,
            right: domRect.right,
        }

        if (this.isSlideInFrame()) {
            this.visible = true;
            this.element.classList.add('_active');
        } else {
            this.visible = false;
            this.element.classList.remove('_active');
        }

        if (this.isAlignableLeft()) {
            this.alignableLeft = true;
            this.element.classList.add('_alignable-left');
        } else {
            this.alignableLeft = false;
            this.element.classList.remove('_alignable-left');
        }

        if (this.isAlignableRight()) {
            this.alignableRight = true;
            this.element.classList.add('_alignable-right');
        } else {
            this.alignableRight = false;
            this.element.classList.remove('_alignable-right');
        }

        store.dispatch(updateSlide(this));
    }

    getAbsoluteWidth = (): number => {
        const marginLeft = getComputedStyle(this.element).marginLeft.replace(/(\d+).+/, "$1");
        const marginRight = getComputedStyle(this.element).marginRight.replace(/(\d+).+/, "$1");

        return this.axis.width + Number(marginLeft) + Number(marginRight);
    }

    isSlideInFrame = (): boolean => {
        return (
            this.axis.left >= store.state.carousel.axis.left &&
            this.axis.right <= store.state.carousel.axis.right
        );
    }

    isAlignableLeft = (): boolean => {
        return (
            this.axis.left < store.state.carousel.axis.left &&
            this.axis.right > store.state.carousel.axis.left
        );
    }

    isAlignableRight = (): boolean => {
        return (
            this.axis.left < store.state.carousel.axis.right &&
            this.axis.right > store.state.carousel.axis.right
        )
    }
}

export default Slide;