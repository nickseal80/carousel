import { Action } from "../types";
import Slide from "../../carousel/Slide";

export interface SlidesInitialState {
    items: Slide[];
}

export interface UpdateSlidesAction extends Action {
    slides: Slide[];
}

export interface UpdateSlideAction extends Action {
    slide: Slide;
}