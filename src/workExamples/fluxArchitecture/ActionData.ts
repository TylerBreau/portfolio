
import { IActionData } from './IActionData';

export class ActionData<TData = unknown> implements IActionData<TData> {
    private $tag: string;
    private $data: any;

    public constructor(tag: string, data: TData) {
        this.$tag = tag;
        this.$data = data;
    }

    public getTag(): string {
        return this.$tag;
    }

    public getData(): TData {
        return this.$data;
    }
}
