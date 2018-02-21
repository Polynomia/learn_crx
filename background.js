chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    chrome.tabs.sendMessage(tab.id,'Hello'); // Notification on Completion
    console.log("send message!")
});