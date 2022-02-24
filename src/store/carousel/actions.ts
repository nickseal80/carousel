import {UpdateFrameWidthAction} from "./types";
import actionTypes from "./actionTypes";

export const updateFrameWidth = (width: number): UpdateFrameWidthAction => ({
    type: actionTypes.UPDATE_FRAME_WIDTH,
    width
});

