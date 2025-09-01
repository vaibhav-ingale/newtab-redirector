// Get default URL from manifest
const manifest = chrome.runtime.getManifest();
const DEFAULT_REDIRECT_URL = 'https://calendar.google.com/calendar/u/0/r/week'

chrome.tabs.onCreated.addListener(async (tab) => {
  console.log('Tab created with URL:', tab.url);
  
  // Wait a moment for the tab to fully load, then get the actual URL
  setTimeout(async () => {
    try {
      const updatedTab = await chrome.tabs.get(tab.id);
      console.log('Updated tab URL:', updatedTab.url);
      
      if (updatedTab.url === 'chrome://newtab/' || updatedTab.url === 'about:blank') {
        console.log('Empty new tab detected, retrieving stored URL...');
        const result = await chrome.storage.sync.get(['redirectUrl']);
        const redirectUrl = result.redirectUrl || DEFAULT_REDIRECT_URL;
        console.log('Retrieved redirect URL:', redirectUrl);
        
        chrome.tabs.update(tab.id, { url: redirectUrl });
        console.log('Tab redirected to:', redirectUrl);
      } else {
        console.log('No redirect - tab has specific URL:', updatedTab.url);
      }
    } catch (error) {
      console.log('Error getting tab info:', error);
    }
  }, 100);
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed, setting default redirect URL');
  chrome.storage.sync.set({ redirectUrl: DEFAULT_REDIRECT_URL });
  console.log('Default redirect URL set to:', DEFAULT_REDIRECT_URL);
});