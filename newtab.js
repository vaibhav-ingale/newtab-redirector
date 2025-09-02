document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('iframe-container');
    const loading = document.getElementById('loading');
    
    try {
        const result = await chrome.storage.sync.get(['iframeTag']);
        const iframeTag = result.iframeTag;
        
        if (!iframeTag) {
            // Show message with clickable link to settings
            container.innerHTML = `
                <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
<h1>New Tab Redirector</h1>                    
                    <p>Configure your iframe from plugin settings</p>
                    <button id="open-settings" style="
                        background: #4285f4; 
                        color: white; 
                        border: none; 
                        padding: 10px 20px; 
                        border-radius: 4px; 
                        cursor: pointer;
                        font-size: 16px;
                    ">Open Settings</button>
                </div>
            `;
            
            // Add click handler for settings button
            document.getElementById('open-settings').addEventListener('click', () => {
                chrome.runtime.openOptionsPage();
            });
        } else {
            // Modify iframe to be 800x600
            const modifiedIframe = iframeTag
                .replace(/width=["'][^"']*["']/gi, 'width="800"')
                .replace(/height=["'][^"']*["']/gi, 'height="600"')
                .replace(/style=["']([^"']*)["']/gi, 'style="$1; width: 800px; height: 600px; border: none;"')
                .replace(/frameborder=["'][^"']*["']/gi, 'frameborder="0"');
            
            container.innerHTML = modifiedIframe;
            
            // Add load event listener to iframe to hide loading when ready
            const iframe = container.querySelector('iframe');
            if (iframe) {
                iframe.addEventListener('load', () => {
                    loading.style.display = 'none';
                });
                
                // Fallback: hide loading after 10 seconds if iframe doesn't load
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 10000);
            } else {
                loading.style.display = 'none';
            }
        }
        
        // Only hide loading immediately if no iframe is configured
        if (!result.iframeTag) {
            loading.style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading iframe:', error);
        container.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                <h2>Error loading iframe</h2>
                <p>Add your iframe from plugin settings</p>
                <button id="open-settings-error" style="
                    background: #4285f4; 
                    color: white; 
                    border: none; 
                    padding: 10px 20px; 
                    border-radius: 4px; 
                    cursor: pointer;
                    font-size: 16px;
                ">Open Settings</button>
            </div>
        `;
        
        // Add click handler for error case settings button
        document.getElementById('open-settings-error').addEventListener('click', () => {
            chrome.runtime.openOptionsPage();
        });
        
        loading.style.display = 'none';
    }
});