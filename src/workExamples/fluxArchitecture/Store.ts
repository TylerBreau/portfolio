
import { EventEmitter } from 'events';
import { IStore } from './IStore';
import { IActionData } from './IActionData';
import { Dispatcher } from './Dispatcher';

export abstract class Store extends EventEmitter implements IStore {
    public constructor() {
        super();
        this.setMaxListeners(100);
        Dispatcher.getInstance().register(this._getStoreName(), (data: IActionData) => {
            if (this._update(data)) {
                this.$onUpdate();
            }
        });
    }

    protected abstract _getStoreName(): string;

    public register(callback: () => void): void {
        this.on('update', callback);
    }

    public unregister(callback: () => void): void {
        this.removeListener('update', callback);
    }

    private $onUpdate(): void {
        this.emit('update');
    }

    protected abstract _update(data: IActionData): boolean;
}
