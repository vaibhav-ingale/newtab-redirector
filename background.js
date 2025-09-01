chrome.tabs.onCreated.addListener(async (tab) => {
  if (tab.url === 'chrome://newtab/' || tab.url === 'about:blank' || !tab.url) {
    const result = await chrome.storage.sync.get(['redirectUrl']);
    const redirectUrl = result.redirectUrl || 'https://www.google.com';
    
    chrome.tabs.update(tab.id, { url: redirectUrl });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ redirectUrl: 'https://www.google.com' });
});