import { TapeInitialState } from "./types";
import { Action } from "../types";
import actionTypes from "./actionTypes";

export const tapeInitialState: TapeInitialState = {
    position: 0,
    tapeCanMoved: false,
    tapeMoving: false,
}

export const tapeReducer = (state: TapeInitialState = tapeInitialState, action: Action) => {
    switch (action.type) {

        case actionTypes.UPDATE_POSITION:
            return { ...state, position: action.position };

        case actionTypes.UPDATE_TAPE_CAN_MOVED:
            return { ...state, tapeCanMoved: action.state };

        case actionTypes.UPDATE_TAPE_MOVING:
            return { ...state, tapeMoving: action.state };

        default:
            return state;
    }
}