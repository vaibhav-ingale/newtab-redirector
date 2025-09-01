// Get default URL from manifest
const manifest = chrome.runtime.getManifest();
const DEFAULT_REDIRECT_URL = 'https://calendar.google.com/calendar/u/0/r/week'

chrome.tabs.onCreated.addListener(async (tab) => {
  console.log('Tab created with URL:', tab.url);
  if ((tab.url === 'chrome://newtab/' || tab.url === 'about:blank' || !tab.url) && !tab.url?.startsWith('chrome://')) {
    console.log('Condition met for redirect, retrieving stored URL...');
    const result = await chrome.storage.sync.get(['redirectUrl']);
    const redirectUrl = result.redirectUrl || DEFAULT_REDIRECT_URL;
    console.log('Retrieved redirect URL:', redirectUrl);
    
    chrome.tabs.update(tab.id, { url: redirectUrl });
    console.log('Tab redirected to:', redirectUrl);
    
    // Clear the original URL from history
    setTimeout(() => {
      chrome.history.deleteUrl({ url: tab.url });
      console.log('Cleared original URL from history:', tab.url);
    }, 1000);
  } else {
    console.log('No redirect - URL does not match conditions');
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed, setting default redirect URL');
  chrome.storage.sync.set({ redirectUrl: DEFAULT_REDIRECT_URL });
  console.log('Default redirect URL set to:', DEFAULT_REDIRECT_URL);
});