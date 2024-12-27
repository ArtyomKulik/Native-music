import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import Icon_Home from '../assets/home.png';
import Home  from './screens/Home';
import NotFound from './screens/NotFound';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={Icon_Home}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },

  },
});

const RootStack = createNativeStackNavigator({
 
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  }
})

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
