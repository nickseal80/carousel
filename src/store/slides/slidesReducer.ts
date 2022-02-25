import { SlidesInitialState } from "./types";
import { Action } from "../types";
import actionTypes from "./actionTypes";

export const slidesInitialState: SlidesInitialState = {
    items: [],
};

export const slidesReducer = (state: SlidesInitialState = slidesInitialState, action: Action) => {
    switch (action.type) {

        case actionTypes.UPDATE_SLIDES:
            return { ...state, items: action.slides };

        case actionTypes.UPDATE_SLIDE:
            const slides = [ ...state.items ];
            slides.splice(action.slide.order, 1, action.slide);
            return { ...state, items: slides };


        default:
            return state;
    }
}