import { Action, Reducer, State } from "./types";
import { initialState } from "./initialState";
import { carouselReducer } from "./carousel/carouselReducer";
import { slidesReducer } from "./slides/slidesReducer";
import { tapeReducer } from "./tape/tapeReducer";

export const reducer: Reducer = (state: State = initialState, action: Action): State => {
    const prefix = action.type.replace(/^([a-z]+)\.[A-Z_]+/,"$1");

    switch (prefix) {

        case 'carousel':
            return { ...state, carousel: carouselReducer(state.carousel, action) };

        case 'tape':
            return { ...state, tape: tapeReducer(state.tape, action) };

        case 'slides':
            return { ...state, slides: slidesReducer(state.slides, action) };

        default:
            return state;
    }
}