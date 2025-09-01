# New Tab Redirector

A Chrome extension that redirects empty new tabs to your preferred URL while leaving intentionally opened tabs untouched.

## Features

- Redirects only truly empty new tabs (`chrome://newtab/`, `about:blank`)
- Preserves specific URLs when opened intentionally (e.g., `chrome://settings/`)
- Customizable redirect URL through popup interface
- Persistent storage of user preferences
- Debug logging for troubleshooting

## Installation & Deployment

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/vaibhav-ingale/newtab-redirector.git
   cd newtab-redirector
   ```

2. **Load in Chrome (Developer Mode)**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the project directory

3. **Test the extension**
   - Open a new tab (Cmd+T / Ctrl+T) - should redirect
   - Open settings (Cmd+, / Ctrl+,) - should NOT redirect
   - Click the extension icon to configure redirect URL


## File Structure

```
├── manifest.json         # Extension configuration
├── background.js         # Main extension logic
├── popup.html            # Settings popup interface
├── popup.js              # Popup functionality
├── images/               # Extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md
```

## Permissions

- `tabs` - Monitor tab creation and updates
- `storage` - Save user preferences
- `history` - Clean up redirect history entries
- `<all_urls>` - Access all websites for redirects

## Development Notes

The extension uses Chrome's Manifest V3 and includes:
- Service worker background script
- Chrome Storage API for preferences
- Tab event listeners with smart URL detection
- Popup interface for configuration

## Troubleshooting

1. **Extension not redirecting**
   - Check Chrome extensions page for errors
   - Look at browser console for debug logs
   - Verify extension permissions are granted

2. **Wrong pages being redirected**
   - Check console logs to see URL detection
   - Ensure only `chrome://newtab/` and `about:blank` trigger redirects

3. **Settings not saving**
   - Verify storage permissions are enabled
   - Check popup console for JavaScript errors