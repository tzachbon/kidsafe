import ChromeListener, { } from './utils/chrome.util'

// // listen to 
// chrome.runtime.onMessage.addListener((req) => {
//     console.log('====================================');
//     console.log(req);
//     console.log('====================================');
// })

// setTimeout(() => {
//     const requestData = { action: 'message', payload: 'hey' };
//     chrome.extension.sendRequest(requestData);
// }, 1500);


const eventChromeListener = new ChromeListener<string>('CONTENT', 'message');

eventChromeListener.subscribe((value) => {
    if (value) {
        alert(value)
        eventChromeListener.sendMessage('Thank you!')
    }
})