import actionTypes from "./actionTypes";
import { UpdatePositionAction } from "./types";

export const updatePosition = (position: number): UpdatePositionAction => ({
    type: actionTypes.UPDATE_POSITION,
    position
});