
import { IActionData } from './IActionData';
import { IAction } from './IAction';

import { ActionData } from './ActionData';
import { Dispatcher } from './Dispatcher';

export abstract class Action<TArgs = void, TResponse = void> implements IAction<TArgs, TResponse> {
    public abstract getTag(): string;

    /**
    * 
    * Checks if ActionData was produced by an Action of this type.
    * If it was, it would be type of ActionData<TResponse> and the type is narrowed down for typescript.
    * 
    * @param ad ActionData received from the Dispatcher
    * @returns TypeScript Predicate
    */
    public checkType(ad: IActionData): ad is IActionData<TResponse> {
        return ad.getTag() === this.getTag();
    }

    protected _dispatch(data: TResponse) {
        Dispatcher.getInstance().dispatch(new ActionData(this.getTag(), data));
    }

    public execute(args: TArgs): Promise<TResponse> {
        return this._execute(args).then((result) => {
            this._dispatch(result);
            return Promise.resolve(result);
        });
    }

    protected abstract _execute(args: TArgs): Promise<TResponse>;
}
