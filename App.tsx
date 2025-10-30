import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Screens
import SignInScreen from './screens/SignInScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import OpportunitiesFeedScreen from './screens/OpportunitiesFeedScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import SettingsScreen from './screens/SettingsScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from './screens/TermsOfServiceScreen';
// Utilities
import { MockConvexProvider } from './lib/mockConvex';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { ErrorBoundary } from './lib/ErrorBoundary';
import { theme } from './lib/theme';

type RootStackParamList = {
  SignIn: undefined;
  Onboarding: undefined;
  Home: undefined;
  Opportunities: undefined;
  Subscription: undefined;
  Settings: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      ) : !user?.hasCompletedOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Opportunities" component={OpportunitiesFeedScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Stack.Screen name="Terms" component={TermsOfServiceScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <MockConvexProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <StatusBar
              barStyle={theme.dark ? 'light-content' : 'dark-content'}
              backgroundColor={theme.colors.background}
            />
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </AuthProvider>
      </MockConvexProvider>
    </ErrorBoundary>
  );
}