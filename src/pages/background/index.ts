console.log("Content script loaded");
chrome.action.onClicked.addListener(function() {
    chrome.windows.create({
      url: 'src/pages/Panel/index.html',
      type: 'popup',
      width: 1000,
      height: 600,
      left: 100,
      top: 100
    });
  });
  