import Slide from "../../carousel/Slide";
import { UpdateSlidesAction, UpdateSlideAction } from "./types";
import actionTypes from "../slides/actionTypes";

export const updateSlides = (slides: Slide[]): UpdateSlidesAction => ({
    type: actionTypes.UPDATE_SLIDES,
    slides
});

export const updateSlide = (slide: Slide): UpdateSlideAction => ({
    type: actionTypes.UPDATE_SLIDE,
    slide
})