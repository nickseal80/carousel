import actionTypes from "./actionTypes";
import { UpdatePositionAction, UpdateTapeCanMovedAction, UpdateTapeMovingAction } from "./types";

export const updatePosition = (position: number): UpdatePositionAction => ({
    type: actionTypes.UPDATE_POSITION,
    position
});

export const updateTapeCanMoved = (state: boolean): UpdateTapeCanMovedAction => ({
    type: actionTypes.UPDATE_TAPE_CAN_MOVED,
    state
});

export const updateTapeMoving = (state: boolean): UpdateTapeMovingAction => ({
    type: actionTypes.UPDATE_TAPE_MOVING,
    state
});