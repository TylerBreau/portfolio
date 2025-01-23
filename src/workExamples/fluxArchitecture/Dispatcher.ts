
import { IActionData } from './IActionData';

export class Dispatcher {
    private $callbacks: Record<string, (data: IActionData) => void>;

    private static $instance: Dispatcher;

    private constructor() {
        this.$callbacks = {};
    }

    public static getInstance(): Dispatcher {
        if (!Dispatcher.$instance) {
            Dispatcher.$instance = new Dispatcher();
        }

        return Dispatcher.$instance;
    }

    public dispatch(data: IActionData): void {
        for (let i in this.$callbacks) {
            this.$callbacks[i](data);
        }
    }

    /**
        * 
        * @param id Must not already be registered.
        * @param callback 
        * @returns 
        */
    public register(id: string, callback: (data: IActionData) => void): string {
        if (this.$callbacks[id]) {
            throw new Error('Duplicater register for id: ' + id)
        }
        this.$callbacks[id] = callback;
        return id;
    }

    public unregister(id: string): void {
        delete this.$callbacks[id];
    }
}
