import dispatcher from "../modules/EventDispatcher";
import {Config} from "../interfaces/Config";
import Tape from "./Tape";
import Navigation from "./navigation/Navigation";

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
        this.initSlidesStyles(slides);

        if (slides.length > 0) {
            this._element.innerHTML = '';

            // вставка навигационных кнопок
            if (this.config.navButtons) {
                new Navigation(this, this.config);
            }

            // вставка слайдера
            new Tape(this, slides);

            dispatcher.trigger('carouselInitialized', { carousel: this });
        }
    }

    initSlidesStyles = (slides: HTMLElement[]) => {
        let width: number;
        slides.forEach(slide => {
            if (this.config.itemWidth && this.config.itemWidth > 0) {
                width = this.config.itemWidth;
            } else {
                width = slide.getBoundingClientRect().width;
            }

            slide.style.minWidth = `${width}px`;
        })
    }
}

export default Carousel;