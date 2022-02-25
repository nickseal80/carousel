import { UpdateAxisAction, UpdateConfigAction } from "./types";
import actionTypes from "./actionTypes";
import { Axis } from "../../interfaces/Axis";
import { Config } from "../../interfaces/Config";

export const updateFrameAxis = (axis: Axis): UpdateAxisAction => ({
    type: actionTypes.UPDATE_FRAME_AXIS,
    axis
});

export const updateConfig = (config: Config): UpdateConfigAction => ({
    type: actionTypes.UPDATE_CONFIG,
    config
});

