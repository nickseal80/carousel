import { Action } from "../types";

export interface TapeInitialState {
    position: number;
}

export interface UpdatePositionAction extends Action{
    position: number;
}