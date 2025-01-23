
export interface IActionData<TData = unknown> {
    getTag(): string;
    getData(): TData;
}
