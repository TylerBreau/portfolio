
export interface IStore {
    register(callback: () => void): void;
    unregister(callback: () => void): void;
}
