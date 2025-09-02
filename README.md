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
├── newtab.html           # New tab page interface
├── newtab.js             # New tab page functionality
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── settings.html         # Settings/options page
├── settings.js           # Settings page functionality
├── images/               # Extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-128.png
├── ss.png                # Screenshot
└── README.md
```

## Permissions

- `storage` - Save user iframe preferences and settings
- `tabs` - Monitor tab creation, updates, and reload settings pages
- `<all_urls>` - Access all websites for iframe embedding

## Development Notes

The extension uses Chrome's Manifest V3 and includes:

- Service worker background script
- Chrome Storage API for preferences
- Tab event listeners with URL detection
- Popup interface for configuration
- CSS loader https://css-loaders.com/infinity/

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

## Changelog

### Version 1.1

- **Removed default iframe**: No longer shows a default iframe when none is configured
- **Added settings integration**: New tab page now shows a message with a clickable button to open settings when no iframe is configured
- **Enhanced user experience**: Clear guidance for users to configure their iframe through the settings page
- **Updated options page**: Properly configured options page in manifest for better settings access
- **Improved error handling**: Better error messages and user guidance when iframe is not configured
