chrome.tabs.onCreated.addListener(async (tab) => {
  console.log('Tab created with URL:', tab.url);
  if ((tab.url === 'chrome://newtab/' || tab.url === 'about:blank' || !tab.url) && !tab.url?.startsWith('chrome://')) {
    console.log('Condition met for redirect, retrieving stored URL...');
    const result = await chrome.storage.sync.get(['redirectUrl']);
    const redirectUrl = result.redirectUrl || 'https://www.google.com';
    console.log('Retrieved redirect URL:', redirectUrl);
    
    chrome.tabs.update(tab.id, { url: redirectUrl });
    console.log('Tab redirected to:', redirectUrl);
  } else {
    console.log('No redirect - URL does not match conditions');
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed, setting default redirect URL');
  chrome.storage.sync.set({ redirectUrl: 'https://www.google.com' });
  console.log('Default redirect URL set to: https://www.google.com');
});