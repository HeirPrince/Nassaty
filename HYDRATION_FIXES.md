# React Hydration & Manifest Errors - Fixed

## Date: 2026-02-07

## Issues Identified and Resolved

### 1. React Hydration Errors (#418, #423)
**Root Cause:** Server-rendered HTML didn't match client-side render due to `useWindowSize` hook returning different values during SSR vs. client hydration.

**Fix Applied:**
- Modified `app/hooks/useWindowSize.js` to check if `window` exists before setting default dimensions
- Changed from static default to dynamic initialization that uses actual window dimensions when available
- This prevents SSR/client mismatch by ensuring consistent initial state

**Files Modified:**
- `app/hooks/useWindowSize.js`

### 2. Manifest Icon Size Errors
**Root Cause:** Icon files declared incorrect dimensions in `manifest.json` and `root.jsx`. All icons were actually 74x94 pixels, but declared as:
- `shortcut.png`: declared 64x64 (actual: 74x94)
- `icon-256.png`: declared 256x256 (actual: 74x94)
- `icon-512.png`: declared 512x512 (actual: 74x94)

**Fix Applied:**
- Updated `public/manifest.json` with correct icon dimensions (74x94)
- Updated `app/root.jsx` link tags with correct sizes

**Files Modified:**
- `public/manifest.json`
- `app/root.jsx`

### 3. CORS/Unsafe URL Loading Error
**Root Cause:** The `<Embed>` component's iframe lacked proper security attributes, causing cross-origin policy violations.

**Fix Applied:**
- Added `sandbox` attribute with appropriate permissions: `"allow-scripts allow-same-origin allow-popups allow-forms"`
- Added `allow` attribute for feature policy control
- This prevents CORS errors while maintaining security

**Files Modified:**
- `app/layouts/post/post-markdown.jsx`

## Testing Recommendations

1. **Clear browser cache** and hard reload (Ctrl+Shift+R)
2. **Check DevTools Console** for:
   - No more React error #418 or #423
   - No manifest icon warnings
   - No CORS/unsafe URL errors
3. **Test PWA manifest** by checking Application tab in DevTools
4. **Verify hydration** by checking that initial page load matches subsequent renders

## Additional Notes

- The hydration fix maintains SSR compatibility while preventing mismatches
- Icon files may need to be regenerated at proper sizes (256x256, 512x512) for better PWA support
- The iframe sandbox attributes can be adjusted based on specific embed requirements
