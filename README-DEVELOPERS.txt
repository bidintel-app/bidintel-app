DEV SETUP GUIDE - README-DEVELOPERS

Purpose:
This file provides a quick, copy-paste developer setup for the Expo + TypeScript mobile app. It focuses on installing missing native-ish dependencies (AsyncStorage, SafeAreaContext) and contains troubleshooting tips for the common "backend unavailable" problems.

1) ESSENTIAL INSTALL COMMANDS (copy-paste)
# Install core dependencies used by this Expo + TypeScript project
npm install

# Install AsyncStorage (persistent storage used by the app)
npm install @react-native-async-storage/async-storage

# Safe area context is often required for layout with SafeAreaView
npm install react-native-safe-area-context

# Accelerometer support for shake gesture detection (Developer screen)
npm install expo-sensors

# If the project uses react-navigation, these are commonly required (uncomment if used)
# npm install @react-navigation/native @react-navigation/bottom-tabs
# npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-masked-view/masked-view

# If using Convex from the template, ensure convex is installed
# npm install convex@latest

# Dev-only helpful tools (linters/types)
npm install --save-dev @types/react @types/react-native typescript eslint

2) QUICK START (after running the installs)
# Start the Metro bundler / Expo
npm start
# From Expo Dev Tools you can run on Android emulator, iOS simulator (macOS), or scan QR to run on a physical device.

3) IN-APP DEVELOPER SCREEN
To access the Developer screen (hidden feature):
- Shake your device (physical device or simulator). On macOS simulator, use Cmd+Z or Cmd+Ctrl+Z.
- You'll see a modal with:
  * Current API URL displayed
  * Backend health status (✓ healthy or ✗ unavailable)
  * One-tap Copy and Share buttons to copy/share the API URL
  * Check Again button to re-run the health check
  * Troubleshooting tips

This is useful for:
- Confirming which backend the app is hitting
- Sharing your configuration with team members or beta testers
- Diagnosing connection issues quickly
- Verifying backend health in real-time

4) COMMON TROUBLESHOOTING
- "Backend unavailable" on a physical device:
  * Localhost inside the mobile app points at the phone, not your computer.
  * Find your computer LAN IP: on macOS/linux run `ifconfig` or `ipconfig getifaddr en0` (mac), on Windows `ipconfig`.
  * Start your backend bound to 0.0.0.0 or the LAN IP, e.g., node server.js --host 0.0.0.0
  * In the running app, go back to the Opportunities feed, tap Edit API URL, and enter: http://<YOUR_COMPUTER_IP>:<PORT>
  * Or shake the device to open the Developer screen to see the current URL and verify it's correct.

- AsyncStorage not found / runtime errors about AsyncStorage:
  * Ensure @react-native-async-storage/async-storage is installed (see commands above).
  * For bare React Native projects linking is automatic for Expo-managed projects; for bare projects run `npx pod-install` in the ios folder after install.

- Metro bundler cache issues / weird module resolution errors:
  * Stop Metro, then run: npm start -- --reset-cache
  * Alternatively remove node_modules and reinstall: rm -rf node_modules && npm install

- iOS simulator-specific issues with pods (bare workflow only):
  * cd ios && pod install

5) ENVIRONMENT / API URL TEMPLATE
You can set an environment variable at build time, or use the in-app API editor.
Example (local dev fallback):
  EXPO_PUBLIC_API_URL=http://localhost:3001

Note: For a device, replace localhost with your computer's LAN IP.

6) VERIFICATION STEPS (after starting app and backend)
1. Start the backend: e.g., npm run dev (or however your backend starts). Confirm in browser: http://localhost:3001/health (or your backend's health endpoint).
2. Start the Expo app: npm start, run on device or simulator.
3. Shake the device to open the Developer screen and verify the API URL is correct.
4. If on a device, the API URL should show your computer's LAN IP; if not, go back and tap Edit API URL to update it.
5. Tap Check Again in the Developer screen; status should show "Backend is Healthy ✓" if reachable.
6. Close the Developer screen; data should now load on the Opportunities feed.

7) COMMON ERROR MESSAGES AND QUICK FIXES
- "Failed to parse package.json" => Verify package.json exists at repo root and is valid JSON.
- "Module X not found" => Ensure you ran npm install; check package.json for dependency presence.
- "Unable to resolve module 'react-native-gesture-handler'" => Install the missing dependency and restart Metro.
- "Accelerometer not available" => On simulators, shake is disabled; you can still access Edit API URL from the main feed.

8) CONTACT / FURTHER HELP
If you still see problems after following this guide, please copy the red error text from the Expo client or metro console and paste it into the project issue chat with these details:
- Platform (iOS simulator / Android emulator / physical iOS / physical Android)
- Exact command you ran to start the backend and the app
- The API URL you used in the app (if you changed it)
- Screenshot of the Developer screen health check result (if applicable)

END OF DEV SETUP GUIDE