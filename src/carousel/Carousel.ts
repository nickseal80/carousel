import dispatcher from "../modules/EventDispatcher";
import { store } from "../index";
import { Config } from "../interfaces/Config";
import Tape from "./Tape";
import Navigation from "./navigation/Navigation";
import { updateConfig, updateFrameAxis } from "../store/carousel/actions";
import Slide from "./Slide";
import { updateSlides } from "../store/slides/actions";

class Carousel {
    private readonly _element: HTMLDivElement;
    private readonly _config: Config;

    get element(): HTMLDivElement {
        return this._element;
    }

    get config(): Config {
        return this._config;
    }

    constructor(element: HTMLDivElement, config: Config) {
        this._element = element;
        this._config = config;
        this.element.classList.add('seal-carousel');
        this.init();
    }

    init = () => {
        const slides: HTMLElement[] = Array.prototype.slice.call(this.element.children);

        if (slides.length > 0) {

            const items = slides.map((slide: HTMLElement) => {
                let width: string;

                if (this.config.itemWidth) {
                    width = `${this.config.itemWidth}px`;
                } else {
                    width = getComputedStyle(slide).width;
                }
                slide.style.minWidth = width;
                return new Slide(slide);
            });

            this._element.innerHTML = '';

            // вставка навигационных кнопок
            if (this.config.navButtons) {
                new Navigation(this, this.config);
            }

            // вставка слайдера
            new Tape(this);
            store.dispatch(updateSlides(items));

            const domRect = this.element.getBoundingClientRect();
            const axis = {
                width: domRect.width,
                height: domRect.height,
                posX: domRect.x,
                posY: domRect.y,
                left: domRect.left,
                right: domRect.right,
            }
            store.dispatch(updateFrameAxis(axis));
            store.dispatch(updateConfig(this.config));

            dispatcher.trigger('carouselInitialized', { carousel: this });
        }
    }
}

export default Carousel;