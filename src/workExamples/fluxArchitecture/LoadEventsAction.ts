
import { Action } from './Action';

export class LoadEventsAction extends Action<void, string[]> {
    public getTag(): string {
        return 'load-events';
    }

    protected _execute(): Promise<string[]> {
        // HTTP Request to server to get event list
        // We're just going to dummy it out.
        return Promise.resolve([
            'event 1',
            'event 2',
            'event 3'
        ]);
    }
}
