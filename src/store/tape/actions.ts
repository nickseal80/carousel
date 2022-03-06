import actionTypes from "./actionTypes";
import {UpdateDirectionAction, UpdatePositionAction, UpdateTapeCanMovedAction, UpdateTapeMovingAction} from "./types";

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

export const updateDirection = (direction: string|undefined): UpdateDirectionAction => ({
    type: actionTypes.UPDATE_DIRECTION,
    direction
})