import dispatcher from "./modules/EventDispatcher";
import Carousel from "./carousel/Carousel";
import {Config} from "./interfaces/Config";
import "./assets/styles/sass/index.scss";

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

carousel.setInstance('div[data-type="carousel"]', {
    itemWidth: 152,
    navButtons: true,
});