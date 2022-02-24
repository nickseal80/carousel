import {Action} from "../types";

export interface CarouselInitialState {
    width: number,
}

export interface UpdateFrameWidthAction extends Action {
    width: number;
}