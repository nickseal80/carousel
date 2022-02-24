import { CarouselInitialState } from "./carousel/types";
import { SlidesInitialState } from "./slides/types";
import { TapeInitialState } from "./tape/types";

export type Reducer = (state: State, action: Action) => State;
export type Action = { type: string, [key: string]: any };

export interface State {
    carousel: CarouselInitialState,
    tape: TapeInitialState,
    slides: SlidesInitialState,
}