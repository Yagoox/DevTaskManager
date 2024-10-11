chrome.action.onClicked.addListener(function() {
  console.log('Background script is running.');
  chrome.windows.create({
    url: chrome.runtime.getURL('frontend/src/pages/home/index.html'), 
    type: 'popup',
    width: 1050,
    height: 500,
    left: 100,
    top: 100
  });
});
