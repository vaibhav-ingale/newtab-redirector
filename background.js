// Get default URL from manifest
const manifest = chrome.runtime.getManifest();
const DEFAULT_REDIRECT_URL = 'https://calendar.google.com/calendar/u/0/r/week'

chrome.tabs.onCreated.addListener(async (tab) => {
  console.log('Tab created with URL:', tab.url);
  console.log('URL length:', tab.url ? tab.url.length : '0');

  if ((tab.url === 'chrome://newtab/' || tab.url === 'about:blank' || !tab.url) && !tab.url?.startsWith('chrome://')) {
    console.log('Condition met for redirect, retrieving stored URL...');
    const result = await chrome.storage.sync.get(['redirectUrl']);
    const redirectUrl = result.redirectUrl || DEFAULT_REDIRECT_URL;
    console.log('Retrieved redirect URL:', redirectUrl);
    
    chrome.tabs.update(tab.id, { url: redirectUrl });
    console.log('Tab redirected to:', redirectUrl);
    
  } else {
    console.log('No redirect - tab has specific URL or is not empty new tab');
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed, setting default redirect URL');
  chrome.storage.sync.set({ redirectUrl: DEFAULT_REDIRECT_URL });
  console.log('Default redirect URL set to:', DEFAULT_REDIRECT_URL);
});