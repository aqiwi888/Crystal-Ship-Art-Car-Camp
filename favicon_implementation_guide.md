# Favicon Implementation Guide for The Crystal Ship Website

## What is a Favicon?

A favicon (short for "favorite icon") is a small icon associated with a website that appears in various places:
- In browser tabs
- In bookmarks lists
- In browser history
- On mobile devices when added to home screen

## Implementation Instructions

Follow these steps to add the favicon to your Crystal Ship website:

### Step 1: Upload the Favicon Files

Upload all the favicon files from the provided package to the root directory of your website. These include:
- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- favicon-48x48.png
- favicon-64x64.png
- favicon-128x128.png
- favicon-192x192.png
- favicon-512x512.png

### Step 2: Add HTML Code to Your Website

Add the following code to the `<head>` section of all your HTML pages:

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-192x192.png">
<link rel="manifest" href="/site.webmanifest">
```

### Step 3: Create a Web App Manifest File

Create a file named `site.webmanifest` in the root directory with the following content:

```json
{
    "name": "The Crystal Ship Art Car",
    "short_name": "Crystal Ship",
    "icons": [
        {
            "src": "/favicon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/favicon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#0a192f",
    "background_color": "#0a192f",
    "display": "standalone"
}
```

### Step 4: Verify Implementation

After implementing these changes:
1. Clear your browser cache
2. Visit your website
3. Check that the favicon appears in the browser tab
4. Test on different browsers (Chrome, Firefox, Safari, Edge)
5. Test on mobile devices if possible

## Troubleshooting

If the favicon doesn't appear:
- Ensure all files are uploaded to the correct location
- Verify the HTML code is in the `<head>` section of all pages
- Check file permissions (should be readable by the web server)
- Try hard-refreshing your browser (Ctrl+F5 or Cmd+Shift+R)
- Check browser developer tools for any 404 errors related to favicon files

## Additional Information

- The favicon will be cached by browsers, so changes may not be immediately visible to returning visitors
- Some browsers prioritize certain formats over others
- The provided set of files ensures maximum compatibility across devices and browsers
