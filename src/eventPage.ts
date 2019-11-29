import ChromeListener from './utils/chrome.util'
import { WebWorker } from './models/web-worker.model';
import { WEB_WORKER_URL } from './utils/web-worker';

window.addEventListener("load", init, false);
const scanDomWebWorker = new Worker(WEB_WORKER_URL);

let DOM: string;
const storage = chrome.storage.sync;
const storageKey = 'kidsafe_scan_web';
interface GetStorageType<T> {
    [key: string]: T | {
        newValue: T;
        oldValue: T
    }
}
storage.get(storageKey, (obj: GetStorageType<boolean>) => {
    const value = obj[storageKey];
    if (typeof value === 'boolean') {
        handleKidsafeChange<boolean>(value);
    }
})


function init() {

    const eventChromeListener = new ChromeListener<string>('CONTENT', 'scan');
    const sendMessage = message => eventChromeListener.sendMessage(message);
    eventChromeListener.subscribe(handleKidsafeChange)

}



function handleKidsafeChange<T = any>(value: T) {
    if (value === undefined || value === null) { return; }
    console.log(value);


    if (value) {
        const dom = DOM = document.body.innerHTML;
        const message: WebWorker.Message = {
            action: 'FILTER',
            payload: dom
        }
        scanDomWebWorker.postMessage(message)
        scanDomWebWorker.addEventListener('message', (event) => {
            const data: WebWorker.Message = event.data;
            const { action, payload } = data;
            if (action === 'FILTER') {
                document.body.innerHTML = payload;
            }
        })
    } else if (!!DOM) {
        document.body.innerHTML = DOM;
    }
}