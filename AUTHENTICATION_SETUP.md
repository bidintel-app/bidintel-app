# Authentication & Premium Features Setup

## Overview
This document describes the authentication system, onboarding flow, backend integration, and premium feature gating implemented in the BidIntel Navigator app.

## ✅ Implemented Features

### 1. **Authentication System**
- **Convex Auth Integration**: Email/password authentication using `@convex-dev/auth`
- **Auth Context** (`lib/AuthContext.tsx`): Global state management for user profile
- **Sign-in Screen** (`screens/SignInScreen.tsx`): Clean, mobile-first auth UI
- **Persistent Sessions**: Automatic token management via Convex

### 2. **Onboarding Flow**
- **Multi-step Process**: 
  - Step 0: Contractor type selection (Prime vs. Sub)
  - Step 1: Business information
  - Step 2: NAICS codes & capabilities
  - Step 3: Completion
- **Backend Integration**: Saves all onboarding data to Convex
- **Default Plan**: All new users start with "free" plan

### 3. **Backend Integration (Convex)**
- **Schema** (`convex/schema.ts`):
  - Extended users table with onboarding fields
  - Opportunities, Prime Contractors, Outreach Logs
- **Functions** (`convex/users.ts`):
  - `getCurrentUser`: Fetch authenticated user profile
  - `updateOnboardingData`: Save onboarding information
  - `updateSubscriptionPlan`: Handle plan upgrades
- **Auth Config** (`convex/auth.ts`): Password provider setup
- **HTTP Routes** (`convex/http.ts`): Auth endpoints

### 4. **Navigation Stack**
- **Unauthenticated**: Shows SignInScreen
- **New Users**: Shows OnboardingScreen after sign-in
- **Returning Users**: Shows HomeScreen with bottom tabs
- **Bottom Tabs**:
  1. Home
  2. Opportunities
  3. Matches (Prime Matching) - Premium
  4. CRM - Premium

### 5. **Premium Feature Gates**
- **FeatureGate Component** (`components/FeatureGate.tsx`):
  - Automatically detects user plan from auth context
  - Blocks free users from premium features
  - Shows upgrade prompt with pricing
  - Navigates to subscription screen
- **Protected Features**:
  - `prime_matching`: AI-powered contractor matching
  - `crm_integration`: CRM contact management
  - Both require Pro plan or higher

### 6. **Subscription Management**
- **SubscriptionScreen** (`screens/SubscriptionScreen.tsx`):
  - Displays all plans (Free, Pro, Enterprise)
  - Shows current plan
  - Handles upgrades via Convex mutation
  - Success/error feedback
- **Payment Processing**: Wired through `updateSubscriptionPlan` mutation
  - Note: Currently updates plan directly (payment gateway integration pending)

## 🗂️ File Structure

```
convex/
├── schema.ts              # Database schema with auth tables
├── auth.ts                # Convex auth configuration
├── http.ts                # HTTP routes for auth
└── users.ts               # User queries and mutations

lib/
└── AuthContext.tsx        # Auth state provider

screens/
├── SignInScreen.tsx       # Email/password sign-in
├── OnboardingScreen.tsx   # Multi-step onboarding
├── PrimeMatchingScreen.tsx # Premium feature
├── CRMScreen.tsx          # Premium feature
└── SubscriptionScreen.tsx # Plan management

components/
└── FeatureGate.tsx        # Premium feature wrapper

App.tsx                    # Root with auth routing
```

## 🚀 User Flow

### New User Journey
1. Open app → SignInScreen
2. Sign up with email/password
3. OnboardingScreen (3 steps)
4. Save profile to Convex
5. Navigate to HomeScreen with free plan
6. Access basic features, see upgrade prompts for premium

### Returning User Journey
1. Open app → Auto-login
2. Load user profile from Convex
3. Navigate to HomeScreen
4. Access features based on plan

## 🔒 Security

- Passwords handled by Convex Auth (hashed, secure)
- Session tokens managed automatically
- Auth context checks authentication state
- Protected routes enforce authentication
- Feature gates enforce plan requirements

## 📊 Subscription Plans

| Plan | Price | Opportunities | Prime Matches | CRM Contacts |
|------|-------|---------------|---------------|--------------|
| Free | $0 | 100 | 5/mo | 10 |
| Pro | $99/mo | Unlimited | 50/mo | 1000 |
| Enterprise | $299/mo | Unlimited |

## 🎯 Next Steps (Future Enhancements)

### Payment Integration
- [ ] Integrate Stripe/RevenueCat for real payment processing
- [ ] Add payment method collection
- [ ] Implement subscription webhooks
- [ ] Handle plan cancellations and refunds

### Enhanced Features
- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] OAuth providers (Google, Microsoft)
- [ ] Team/organization support
- [ ] Usage tracking and limits enforcement

## 📝 Developer Notes

- The app uses Convex's built-in ConvexProvider (no manual client creation needed in production)
- Auth state is managed via `useAuth()` hook from AuthContext
- Feature gates use `SubscriptionService` to check plan access
- All mutations require authentication via `getAuthUserId()`

## 🐛 Known Issues

- Linting warnings about `useAuth` vs `useAuthActions` (false positive, context hook is valid)
- ConvexReactClient instantiation warning (handled by a0 platform)
- Payment processing is simulated (needs real gateway integration)