document.addEventListener('DOMContentLoaded', async () => {
  console.log('Popup loaded, initializing...');
  const urlInput = document.getElementById('urlInput');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  console.log('Retrieving stored redirect URL...');
  const result = await chrome.storage.sync.get(['redirectUrl']);
  console.log('Retrieved configuration:', result);
  urlInput.value = result.redirectUrl || 'https://www.google.com';
  console.log('Set input field to:', urlInput.value);

  saveBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    console.log('Save button clicked, URL entered:', url);
    
    if (!url) {
      console.log('Validation failed: empty URL');
      showStatus('Please enter a URL', 'error');
      return;
    }

    if (!isValidUrl(url)) {
      console.log('Validation failed: invalid URL format');
      showStatus('Please enter a valid URL', 'error');
      return;
    }

    console.log('Saving URL to storage:', url);
    await chrome.storage.sync.set({ redirectUrl: url });
    console.log('URL saved successfully');
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
