import dispatcher, { CarouselEvent } from "../modules/EventDispatcher";
import { store } from "../index";
import Carousel from "./Carousel";
import Slide from "./Slide";
import constants from "../constants";
import slidesActionTypes from "../store/slides/actionTypes";
import carouselActionTypes from "../store/carousel/actionTypes";
import tapeActionTypes from "../store/tape/actionTypes";
import { Config } from "../interfaces/Config";
import { animate } from "../animation/animation";
import { timing } from "../animation/timing";
import { updatePosition } from "../store/tape/actions";

class Tape {
    private readonly _element: HTMLDivElement;
    private _config: Config = {};

    get element(): HTMLDivElement {
        return this._element;
    }

    get config(): Config {
        return this._config;
    }

    constructor(carousel: Carousel) {
        this._element = this.createTapeElement();
        carousel.element.appendChild(this._element);

        this.initSlides();
        this.initListeners();

        store.subscribe((type: string) => {
            if (type === carouselActionTypes.UPDATE_CONFIG) {
                this._config = store.state.carousel.config;
            }
        });
    }

    initSlides = (): void => {
        store.subscribe((type: string) => {

            if (store.state.slides.items.length > 0 && type === slidesActionTypes.UPDATE_SLIDES) {
                store.state.slides.items.forEach((item: Slide, index: number) => {
                    item.init(this, index);
                });
            }

            if (type === tapeActionTypes.UPDATE_POSITION) {
                this.element.style.left = `${store.state.tape.position}px`;
            }
        })
    }

    initListeners = (): void => {
        dispatcher.on('navBtnClick', this.scrollByStep);
    }

    scrollByStep = (evt: CarouselEvent) => {
        let mode: number = 1;

        if (this.config.scrollOptions) {
            if (this.config.scrollOptions?.scrollPage) {
                mode = -1;
            } else if (this.config.scrollOptions.scrollItemsCount) {
                mode = this.config.scrollOptions.scrollItemsCount
            }
        }

        if (evt.data.direction === constants.SCROLL_DIRECTION_PREV) {
            this.scrollByStepPrev(mode);
        } else if (evt.data.direction === constants.SCROLL_DIRECTION_NEXT) {
            this.scrollByStepNext(mode);
        }
    }

    private scrollByStepPrev = (mode: number) => {
        if (mode !== -1) {
            //
        }
    }

    private scrollByStepNext = (mode: number) => {
        const slides: Slide[] = store.state.slides.items;
        const visibleSlides = slides.filter((slide: Slide) => slide.visible);
        let shiftWidth = 0;

        if (mode !== -1) {

            // TODO: додумать. Хрень.

            // const lastVisibleSlide = visibleSlides[visibleSlides.length - 1];
            // slides.forEach((slide: Slide, index: number) => {
            //     if (index > lastVisibleSlide.order && index <= lastVisibleSlide.order + mode) {
            //         if (slide.order === slides.length - 1) {
            //             // считаем конец
            //         } else {
            //
            //         }
            //     }
            // });

            // visibleSlides.forEach((slide: Slide, index: number) => {
            //     if (index <= mode - 1) {
            //         shiftWidth += slide.getAbsoluteWidth();
            //     }
            // });
        } else {
            //
        }

        // this.animateSlide(-shiftWidth);
    }

    private animateSlide = (distance: number) => {
        let timingFunc = 'quad';
        if (store.state.carousel.config.scrollOptions && store.state.carousel.config.scrollOptions?.animation) {
            timingFunc = store.state.carousel.config.scrollOptions?.animation;
        }

        let duration = 400;
        if (store.state.carousel.config.scrollOptions && store.state.carousel.config.scrollOptions?.animDuration) {
            duration = store.state.carousel.config.scrollOptions?.animDuration;
        }

        const position = store.state.tape.position;

        animate({
            duration,

            // @ts-ignore
            timing: timing[timingFunc],

            draw: (progress: number) => {
                store.dispatch(updatePosition(position + (progress * distance)));
            }
        })
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