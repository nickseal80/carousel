import {Action} from "../types";
import { Axis } from "../../interfaces/Axis";
import { Config } from "../../interfaces/Config";

export interface CarouselInitialState {
    axis: Axis,
    config: Config,
}

export interface UpdateAxisAction extends Action {
    axis: Axis;
}

export interface UpdateConfigAction extends Action {
    config: Config;
}