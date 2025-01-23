
import { IActionData } from './IActionData';

export interface IDispatcher {
    dispatch(data: IActionData): void;
    register(id: string, callback: (data: IActionData) => void): void;
    unregister(id: string): void;
}
