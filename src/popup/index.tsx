import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './Popup';

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
    ReactDOM.render(<Popup />, document.getElementById('popup'));
});







// const menuItem: chrome.contextMenus.CreateProperties = {
//     id: 'checkIt',
//     title: 'Check It',
//     contexts: ["selection"]
// };

// chrome.contextMenus.create(menuItem);

// function fixedEncodeURI(str: string) {
//     return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
// }

// chrome.contextMenus.onClicked.addListener((clickedData) => {
//     if (clickedData.menuItemId === menuItem.id) {
//         const { selectionText } = clickedData;
//         const wikiUrl = `https://en.wikipedia.org/wiki/${fixedEncodeURI(selectionText)}`
//         const createData: chrome.windows.CreateData = {
//             url: wikiUrl,
//             type: 'popup',
//             top: 5,
//             left: 5,
//             width: screen.availWidth / 2,
//             height: screen.availHeight / 2
//         }

//         chrome.windows.create(createData, () => {
//             console.log('====================================');
//             console.log('WINDOW OPENED');
//             console.log('====================================');
//         })
//     }
// })