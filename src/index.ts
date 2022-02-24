import dispatcher from "./modules/EventDispatcher";
import Carousel from "./carousel/Carousel";
import Store from "./store/Store";
import {Config} from "./interfaces/Config";
import "./assets/styles/sass/index.scss";
import {initialState} from "./store/initialState";
import {reducer} from "./store/reducer";

const store = new Store(reducer, initialState);

const carousel: { [key: string]: (arg0: string, arg1: Config) => void } = {
    setInstance: (selector: string, config: Config|{} = {}) => {
        const instances: NodeList = document.querySelectorAll(selector);

        if (instances.length > 0) {
            dispatcher.on('carouselInitialized', () => {
                console.log('carousel initialized');
            });

            Array.prototype.forEach.call(instances, instance => {
                new Carousel(instance, config);
            });
        }
    },
}

export { carousel, store };

// dev
carousel.setInstance('div[data-type="carousel"]', {
    itemWidth: 152,
    navButtons: true,
});