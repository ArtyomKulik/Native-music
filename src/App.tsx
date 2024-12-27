import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/home.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: [
          'myapp://',
        ],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
  );
}
