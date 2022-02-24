import { Action } from "../types";
import { CarouselInitialState } from "./types";
import actionTypes from "./actionTypes"

export const carouselInitialState: CarouselInitialState = {
    width: 0,
}

export const carouselReducer = (state: CarouselInitialState = carouselInitialState, action: Action) => {
    switch (action.type) {

        case actionTypes.UPDATE_FRAME_WIDTH:
            return { ...state, width: action.width }

        default:
            return state;
    }
}