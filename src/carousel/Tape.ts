import dispatcher, { CarouselEvent } from "../modules/EventDispatcher";
import { store } from "../index";
import Carousel from "./Carousel";
import Slide from "./Slide";
import constants from "../constants";

class Tape {
    private readonly _element: HTMLDivElement;

    get element(): HTMLDivElement {
        return this._element;
    }

    constructor(carousel: Carousel) {
        this._element = this.createTapeElement();
        carousel.element.appendChild(this._element);

        this.initSlides();
        this.initListeners();
    }

    initSlides = (): void => {
        store.subscribe(() => {
            if (store.state.slides.items.length > 0) {
                store.state.slides.items.forEach((item: Slide) => {
                    item.init(this);
                });
            }
        })
    }

    initListeners = (): void => {
        dispatcher.on('navBtnClick', this.scrollByStep);
    }

    scrollByStep = (evt: CarouselEvent) => {
        if (evt.data.direction === constants.SCROLL_DIRECTION_PREV) {
            this.scrollByStepPrev();
        } else if (evt.data.direction === constants.SCROLL_DIRECTION_NEXT) {
            this.scrollByStepNext();
        }
    }

    private scrollByStepPrev = () => {
        console.log('scroll prev');
    }

    private scrollByStepNext = () => {
        console.log('scroll next');
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