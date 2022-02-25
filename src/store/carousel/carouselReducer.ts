import actionTypes from "./actionTypes"
import { Action } from "../types";
import { CarouselInitialState } from "./types";

export const carouselInitialState: CarouselInitialState = {
    axis: {
        width: 0,
        height: 0,
        posX: 0,
        posY: 0,
        left: 0,
        right: 0,
    },
    config: {},
}

export const carouselReducer = (state: CarouselInitialState = carouselInitialState, action: Action) => {
    switch (action.type) {

        case actionTypes.UPDATE_FRAME_AXIS:
            return { ...state, axis: action.axis };

        case actionTypes.UPDATE_CONFIG:
            return { ...state, config: action.config };

        default:
            return state;
    }
}