export namespace WebWorker {
    export type Action = 'FILTER';

    export interface Message<T = any> {
        action: Action;
        payload: T
    }
}