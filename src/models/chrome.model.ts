export namespace Chrome {
    export type Action = 'message'

    export interface Request<T = any> {
        action: Action;
        payload: T
    }
}