import {Config} from "../../interfaces/Config";
import NavButtons from "./NavButtons";
import Carousel from "../Carousel";

class Navigation {
    constructor(carousel: Carousel, config: Config) {
        if (config.navButtons) {
            const navButtons = new NavButtons();
            navButtons.render(carousel.element);
        }
    }
}

export default Navigation;