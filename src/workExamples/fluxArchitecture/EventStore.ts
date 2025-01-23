
import { Store } from './Store';
import { IActionData } from './IActionData';
import { LoadEventsAction } from './LoadEventsAction';

export class EventStore extends Store {
    private $events: string[];
    private static $instance: EventStore;

    public constructor() {
        super();
        this.$events = [];
    }

    public static getInstance(): EventStore {
        if (!EventStore.$instance) {
            EventStore.$instance = new EventStore();
        }
        return EventStore.$instance;
    }

    protected override _getStoreName() {
        return 'EventStore';
    }

    protected override _update(data: IActionData): boolean {
        if (new LoadEventsAction().checkType(data)) {
            // The checkType predicate narrows down data's typings, so typescript will know the type of data.getData().
            this.$events = data.getData();
            return true;
        }

        return false;
    }

    public getEvents(): string[] {
        return this.$events;
    }
}
