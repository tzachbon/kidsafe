if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        init();
    });
}

function init() {

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        debugger;
        if (request.type == "worktimer-notification")
            chrome.notifications.create('worktimer-notification', request.options, function () { });

        sendResponse();
    });
}