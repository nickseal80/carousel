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
import { Axis } from "../interfaces/Axis";

class Tape {
    private readonly _element: HTMLDivElement;
    private _config: Config = {};
    public axis: Axis;

    get element(): HTMLDivElement {
        return this._element;
    }

    get config(): Config {
        return this._config;
    }

    constructor(carousel: Carousel) {
        this._element = this.createTapeElement();
        carousel.element.appendChild(this._element);

        this.initSlides(carousel);
        this.initListeners();

        store.subscribe((type: string) => {
            if (type === carouselActionTypes.UPDATE_CONFIG) {
                this._config = store.state.carousel.config;
            }
        });
    }

    initSlides = (carousel: Carousel): void => {
        store.subscribe((type: string) => {

            if (store.state.slides.items.length > 0 && type === carouselActionTypes.UPDATE_FRAME_AXIS) {
                let absWidth = 0;
                store.state.slides.items.forEach((item: Slide, index: number) => {
                    item.init(this, index);
                    item.update();
                    absWidth += item.getAbsoluteWidth();
                });
                this.element.style.width = `${absWidth}px`;
            }

            if (type === tapeActionTypes.UPDATE_POSITION) {
                this.element.style.left = `${store.state.tape.position}px`;

                const data = {
                    instance: carousel,
                    position: store.state.tape.position,
                }
                dispatcher.trigger('carouselScroll', data);
            }
        })
    }

    initListeners = (): void => {
        dispatcher.on('navBtnClick', this.scrollByStep);
    }

    scrollByStep = (evt: CarouselEvent) => {
        this.update();
        let mode: number = 1;

        if (this.config.scrollOptions) {
            if (this.config.scrollOptions?.scrollPage) {
                mode = -1;
            } else if (this.config.scrollOptions.scrollItemsCount) {
                mode = this.config.scrollOptions.scrollItemsCount
            }
        }

        const slides: Slide[] = store.state.slides.items;
        const visibleSlides = slides.filter((slide: Slide) => slide.visible);
        let shiftWidth = 0;
        let toEndWidth: number;

        visibleSlides.forEach((slide: Slide, index: number) => {
            if (mode !== -1 && index <= mode - 1) {
                shiftWidth += slide.getAbsoluteWidth();
            }

            if (mode === -1) {
                shiftWidth += slide.getAbsoluteWidth();
            }
        });

        // прокрутка вперёд
        if (evt.data.direction === constants.SCROLL_DIRECTION_PREV) {
            const carouselLeftPos = store.state.carousel.axis.left;
            const tapeLeftPos = this.axis.left;
            toEndWidth = carouselLeftPos - tapeLeftPos;

            if (shiftWidth < toEndWidth) {
                this.scroll(shiftWidth);
            } else {
                this.scroll(toEndWidth);
            }

        // прокрутка назад
        } else if (evt.data.direction === constants.SCROLL_DIRECTION_NEXT) {
            const carouselRightPos = store.state.carousel.axis.right;
            const tapeRightPos = this.axis.right;
            toEndWidth = tapeRightPos - carouselRightPos;

            if (shiftWidth < toEndWidth) {
                this.scroll(-shiftWidth);
            } else {
                this.scroll(-toEndWidth);
            }
        }
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
    }

    private scroll = (distance: number) => {
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