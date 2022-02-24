import dispatcher from "../../modules/EventDispatcher";
import constants from "../../constants";

class NavButtons {
    private prevButton: HTMLDivElement;
    private nextButton: HTMLDivElement;

    constructor() {
        this.buildNavButtons();
    }

    render = (target: HTMLElement) => {
        target.appendChild(this.prevButton);
        target.appendChild(this.nextButton);
    }

    private buildNavButtons = () => {
        this.prevButton = this.buildPrevButton();
        this.nextButton = this.buildNextButton();
    }

    private buildPrevButton = (): HTMLDivElement => {
        const btn = document.createElement('div');
        btn.classList.add('seal-carousel_nav-btn');
        btn.classList.add('prev-btn');
        btn.addEventListener('click', () => {
            dispatcher.trigger('navBtnClick', {direction: constants.SCROLL_DIRECTION_PREV});
        });

        return btn;
    }

    private buildNextButton = (): HTMLDivElement => {
        const btn = document.createElement('div');
        btn.classList.add('seal-carousel_nav-btn');
        btn.classList.add('next-btn');
        btn.addEventListener('click', () => {
            dispatcher.trigger('navBtnClick', {direction: constants.SCROLL_DIRECTION_NEXT});
        });

        return btn;
    }


}

export default NavButtons;