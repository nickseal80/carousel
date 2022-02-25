import {State, Reducer, Action} from "./types";

class Store {
    private _state: State;
    private subscribers: Array<(type: string) => void> = [];
    private readonly reducer: Reducer;

    get state(): State {
        return this._state;
    }

    set state(value: State) {
        this._state = value;
    }

    constructor(reducer: Reducer, initialState: State) {
        this.reducer = reducer;
        this.state = reducer(initialState, { type: '__INIT__' });
    }

    dispatch = (action: Action): void => {
        this.state = this.reducer(this.state, action);
        this.subscribers.forEach(sub => sub(action.type));
    }

    subscribe = (callback: (type: string) => void): void => {
        this.subscribers.push(callback);
    }
}

export default Store;