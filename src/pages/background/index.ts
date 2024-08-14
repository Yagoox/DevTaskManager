chrome.action.onClicked.addListener(function() {
  chrome.windows.create({
    url: chrome.runtime.getURL('src/pages/Panel/index.html'), // Ajuste conforme necessário
    type: 'popup',
    width: 1000,
    height: 600,
    left: 100,
    top: 100
  });
});
