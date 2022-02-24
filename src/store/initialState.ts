import { carouselInitialState } from "./carousel/carouselReducer";
import { slidesInitialState } from "./slides/slidesReducer";
import { tapeInitialState } from "./tape/tapeReducer";

export const initialState = {
    carousel: carouselInitialState,
    tape: tapeInitialState,
    slides: slidesInitialState,
};