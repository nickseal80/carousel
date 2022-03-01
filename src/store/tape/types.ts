import { Action } from "../types";

export interface TapeInitialState {
    position: number;
    tapeCanMoved: boolean;
    tapeMoving: boolean;
}

export interface UpdatePositionAction extends Action {
    position: number;
}

export interface UpdateTapeCanMovedAction extends Action {
    state: boolean;
}

export interface UpdateTapeMovingAction extends Action {
    state: boolean;
}