# Frontend Setup — Expo React Native App

## Overview

This is an Expo-based React Native app (TypeScript) for discovering and tracking government contract opportunities. It connects to a TypeScript backend that ingests data from SAM.gov.

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on iOS/Android (or simulator/emulator)

### Setup

```bash
# Install dependencies
npm install

# Start the Expo development server
npm start

# Scan the QR code with Expo Go app on your phone, or press 'i'/'a' for iOS/Android simulator

# To run on web (requires additional setup)
npm run web
```

## Configuration

The app connects to a backend API. By default, it assumes the backend is running at `http://localhost:3001`.

To configure the API and Convex for local development, copy the provided example `.env.local.example` to `.env.local` and update the values:

```bash
# Copy the example env file
cp .env.local.example .env.local

# Then edit .env.local and set the values for your environment
EXPO_PUBLIC_CONVEX_URL=http://localhost:8787
EXPO_PUBLIC_API_URL=http://localhost:3001

# For production builds, set your production API and Convex URL instead:
EXPO_PUBLIC_API_URL=https://api.yourdomain.com
# EXPO_PUBLIC_CONVEX_URL=https://convex-production-url
```

## Project Structure

```
├── App.tsx                       # Root navigation and app setup
├── screens/
│   ├── OpportunitiesFeedScreen.tsx  # Main feed of opportunities
│   └── (future screens)
├── components/
│   └── OpportunityCard.tsx       # Card component for displaying one opportunity
├── hooks/
│   └── useOpportunities.ts       # Custom hook for fetching opportunities
├── lib/
│   ├── theme.ts                  # Design system (colors, spacing, typography)
│   └── api.ts                    # API client for backend communication
└── types/
    └── index.ts                  # TypeScript type definitions
```

## Development Workflow

### Running the App

**Development server:**
```bash
npm start
```

**Specific platform:**
```bash
npm run android      # Android simulator
npm run ios          # iOS simulator
npm run web          # Web preview
```

**With specific backend:**
```bash
EXPO_PUBLIC_API_URL=http://192.168.1.100:3001 npm start
```

### Environment Setup for Backend Connection

1. **Local Development:**
   - Backend runs at `http://localhost:3001`
   - Frontend runs at `http://localhost:8081` (Expo)
   - For real device testing, use your computer's local IP (e.g., `http://192.168.1.100:3001`)

2. **Production:**
   - Set `EXPO_PUBLIC_API_URL` to your production API domain
   - Ensure CORS is configured on the backend to accept requests from your app domain

### Debugging

**Console Logs:**
```bash
npm start
# In the dev menu, select "View logs"
```

**React Native Debugger:**
```bash
# Install: https://github.com/jhen0409/react-native-debugger
# Then enable "Debug remote JS" from the Expo dev menu
```

**Slow animations:**
- Press `d` in the terminal for the dev menu
- Toggle "Enable fast refresh"

## Key Screens & Components

### OpportunitiesFeedScreen
Main feed screen displaying GSA opportunities.

**Features:**
- Displays a list of opportunities from the backend
- Pagination (next/previous page)
- Pull-to-refresh
- Loading and error states
- Urgency indicators (opportunities closing soon)

**Component Structure:**
```
OpportunitiesFeedScreen (screen)
├── useOpportunities hook (data fetching)
├── FlatList (scrollable list)
│   ├── ListHeaderComponent (title + count)
│   ├── OpportunityCard (each item)
│   └── ListFooterComponent (pagination + loading)
└── Empty/Error states
```

### OpportunityCard
Individual card for displaying one opportunity.

**Displays:**
- Agency badge
- Opportunity title
- Description preview
- Days until close (with urgency color)
- "View on SAM.gov" link

## Styling & Theme

The app uses a centralized theme system defined in `lib/theme.ts`.

**Colors (federal blue theme):**
- Primary: `#1B4D8C` (dark blue)
- Secondary: `#0066CC`
- Success: `#28A745`
- Error: `#DC3545`
- Warning: `#FFC107`

**Typography:**
- Display, Headline, Body, and Label scales
- All components use `theme.typography.*` for consistency

**Spacing & Radii:**
- Spacing: xs (4), sm (8), md (12), lg (16), xl (24), xxl (32)
- Border radius: sm (4), md (8), lg (12), xl (16), full (999)

**To customize:**
Edit `lib/theme.ts` and all screens will auto-update.

## API Integration

The frontend communicates with the backend via `lib/api.ts`:

```typescript
// Fetch opportunities
const response = await fetchOpportunities({
  agency: 'GSA',
  page: 1,
  pageSize: 10,
});

// Trigger SAM.gov ingestion
await triggerSamGovIngest({ agency: 'GSA', limit: 100 });
```

The `useOpportunities` hook wraps these calls and manages loading/error states.

## Troubleshooting

### "Cannot connect to backend"

1. **Check backend is running:**
   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Verify CORS:**
   - Backend `.env` should include your app's origin in `FRONTEND_URL`
   - Default: `http://localhost:8081`

3. **For real device:**
   - Use your computer's IP address instead of `localhost`
   - Example: `EXPO_PUBLIC_API_URL=http://192.168.1.100:3001`

### "Blank screen after loading"

- Check terminal logs: `npm start`
- Press `d` for dev menu and check "View logs"
- Look for red error boxes on screen

### "Hot reload not working"

- Press `r` to reload
- Or disable "Fast Refresh" in dev menu and manually reload

## Next Steps

- **Sprint 2:** Add opportunity detail screen and prime contractor matching
- **Sprint 3:** Add AI-powered prime finder feature
- **Sprint 4:** Add CRM and outreach tracking
- **Sprint 5:** Add user authentication and profile setup

## Building for Release

### iOS

```bash
eas build --platform ios
# Follow prompts to create signed build
```

### Android

```bash
eas build --platform android
# Follow prompts to create signed build
```

See [Expo documentation](https://docs.expo.dev/build/introduction/) for details.

## Performance Tips

1. **Memoize components:**
   ```typescript
   export default memo(OpportunityCard);
   ```

2. **Use FlatList `keyExtractor`:**
   - Already implemented in OpportunitiesFeedScreen

3. **Avoid inline styles:**
   - Use `StyleSheet.create()` (already done)
   - All styles use theme constants

4. **Monitor app size:**
   ```bash
   npm run bundle-analyze
   ```

## Deployment

The app can be published to Expo's cloud:

```bash
eas submit --platform ios --latest
eas submit --platform android --latest
```

For your own backend and app store deployment, refer to the [Expo documentation](https://docs.expo.dev/).

---

**Questions?** Check the main README or backend docs in `/backend/README.md`.