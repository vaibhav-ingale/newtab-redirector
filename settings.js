document.addEventListener('DOMContentLoaded', async () => {
    const iframeInput = document.getElementById('iframeInput');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');
    const status = document.getElementById('status');
    
    // Load existing iframe tag
    const result = await chrome.storage.sync.get(['iframeTag']);
    iframeInput.value = result.iframeTag || '';
    
    // Show placeholder message if no iframe is configured
    if (!result.iframeTag) {
        iframeInput.placeholder = 'Enter your iframe tag here (e.g., <iframe src="https://example.com" width="800" height="600"></iframe>)';
    }
    
    // Save iframe tag
    saveBtn.addEventListener('click', async () => {
        const iframeTag = iframeInput.value.trim();
        
        if (!iframeTag) {
            showStatus('Please enter an iframe tag', 'error');
            return;
        }
        
        // Basic validation - check if it contains iframe tag
        if (!iframeTag.toLowerCase().includes('<iframe') || !iframeTag.toLowerCase().includes('</iframe>')) {
            showStatus('Please enter a valid iframe tag', 'error');
            return;
        }
        
        // Extract src attribute for additional validation
        const srcMatch = iframeTag.match(/src=["']([^"']+)["']/i);
        if (!srcMatch) {
            showStatus('iframe tag must contain a src attribute', 'error');
            return;
        }
        
        try {
            new URL(srcMatch[1]); // Validate URL
        } catch (e) {
            showStatus('iframe src must be a valid URL', 'error');
            return;
        }
        
        await chrome.storage.sync.set({ iframeTag: iframeTag });
        showStatus('Settings saved successfully!', 'success');
        
        // Reload any open new tab pages
        chrome.tabs.query({ url: chrome.runtime.getURL('newtab.html') }, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id);
            });
        });
    });
    
    // Clear iframe settings
    resetBtn.addEventListener('click', async () => {
        iframeInput.value = '';
        iframeInput.placeholder = 'Enter your iframe tag here (e.g., <iframe src="https://example.com" width="800" height="600"></iframe>)';
        await chrome.storage.sync.remove(['iframeTag']);
        showStatus('Iframe settings cleared', 'success');
        
        // Reload any open new tab pages
        chrome.tabs.query({ url: chrome.runtime.getURL('newtab.html') }, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id);
            });
        });
    });
    
    function showStatus(message, type) {
        status.textContent = message;
        status.className = `status ${type}`;
        status.style.display = 'block';
        
        setTimeout(() => {
            status.style.display = 'none';
        }, 3000);
    }
});