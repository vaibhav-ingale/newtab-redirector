document.addEventListener('DOMContentLoaded', async () => {
  const urlInput = document.getElementById('urlInput');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  const result = await chrome.storage.sync.get(['redirectUrl']);
  urlInput.value = result.redirectUrl || 'https://www.google.com';

  saveBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    
    if (!url) {
      showStatus('Please enter a URL', 'error');
      return;
    }

    if (!isValidUrl(url)) {
      showStatus('Please enter a valid URL', 'error');
      return;
    }

    await chrome.storage.sync.set({ redirectUrl: url });
    showStatus('Settings saved!', 'success');
  });

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  function showStatus(message, type) {
    status.textContent = message;
    status.className = type;
    setTimeout(() => {
      status.textContent = '';
      status.className = '';
    }, 2000);
  }
});
