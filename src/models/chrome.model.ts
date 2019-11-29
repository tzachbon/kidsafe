export namespace Chrome {
    export type Action = 'message' | 'scan'

    export interface Request<T = any> {
        action: Action;
        payload: T
    }
}