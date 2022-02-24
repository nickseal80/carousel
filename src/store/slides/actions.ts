import Slide from "../../carousel/Slide";
import { UpdateSlidesAction } from "./types";
import actionTypes from "../slides/actionTypes";

export const updateSlides = (slides: Slide[]): UpdateSlidesAction => ({
    type: actionTypes.UPDATE_SLIDES,
    slides
});