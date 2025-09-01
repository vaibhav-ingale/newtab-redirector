document.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.getElementById('settingsBtn');
  
  if (settingsBtn) {
    settingsBtn.addEventListener('click', async () => {
      console.log('Settings button clicked');
      try {
        const settingsUrl = chrome.runtime.getURL('settings.html');
        console.log('Opening settings URL:', settingsUrl);
        await chrome.tabs.create({ url: settingsUrl });
        window.close();
      } catch (error) {
        console.error('Error opening settings page:', error);
      }
    });
  } else {
    console.error('Settings button not found');
  }
});
