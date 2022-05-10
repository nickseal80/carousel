export type EventCallback = (carouselEvent: CarouselEvent) => void;
export type Events = { [key: string]: EventCallback[]; }
export type EventData = { [key: string]: any }
export type CarouselEvent = { type: string, data: EventData }

class EventDispatcher {
    protected events: Events = {};

    public on = (eventName: string, callback: EventCallback) => {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    public trigger = (eventName: string, data?: EventData) => {
        const handlers = this.events[eventName];

        if (! handlers || handlers.length < 1) {
            return;
        }

        const event = { type: eventName, data };
        Array.prototype.forEach.call(handlers, (handler) => {
            handler(event);
        })
    }
}

const dispatcher = new EventDispatcher();
export default dispatcher;