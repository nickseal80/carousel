import { TapeInitialState } from "./types";
import { Action } from "../types";
import actionTypes from "./actionTypes";

export const tapeInitialState: TapeInitialState = {
    position: 0,
}

export const tapeReducer = (state: TapeInitialState = tapeInitialState, action: Action) => {
    switch (action.type) {

        case actionTypes.UPDATE_POSITION:
            return { ...state, position: action.position };

        default:
            return state;
    }
}