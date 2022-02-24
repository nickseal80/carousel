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

        default:
            return state;
    }
}