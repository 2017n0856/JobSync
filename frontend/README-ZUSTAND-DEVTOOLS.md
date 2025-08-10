# Zustand DevTools Setup

This project now includes Zustand DevTools for debugging your store state in the browser, similar to Redux DevTools.

## Setup

### 1. Install Redux DevTools Extension

You need to install the Redux DevTools Extension in your browser:

- **Chrome/Edge**: [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- **Firefox**: [Redux DevTools Extension](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

### 2. Usage

Once installed, you can:

1. Open your browser's Developer Tools (F12)
2. Look for the "Redux" tab in the developer tools
3. You'll see your Zustand store named "auth-store" with all its state and actions

### 3. Features Available

- **State Inspection**: View the current state of your auth store
- **Action History**: See all actions that have been dispatched
- **Time Travel**: Jump to any previous state
- **State Diff**: See what changed between actions
- **Export/Import**: Save and load state snapshots

### 4. Store Structure

Your auth store includes:
- `user`: Current user object or null
- `token`: Authentication token or null
- `isAuthenticated`: Boolean indicating authentication status
- `redirectUrl`: URL to redirect after login
- Actions: `login`, `logout`, `setRedirectUrl`, `clearRedirectUrl`

### 5. Development vs Production

The devtools are automatically disabled in production builds, so you don't need to worry about them affecting your production code.

## Troubleshooting

If you don't see the Redux tab:
1. Make sure the Redux DevTools Extension is installed
2. Refresh your browser page
3. Check that you're running the development server (`npm run start:dev`)
4. Ensure the browser extension is enabled for your localhost domain 