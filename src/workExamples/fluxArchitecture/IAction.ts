
import { IActionData } from './IActionData';

export interface IAction<TKWArgs = void, TResponse = void> {
    getTag(): string;
    execute(kwargs: TKWArgs): Promise<TResponse>;
    checkType(ad: IActionData<unknown>): ad is IActionData<TResponse>;
}
