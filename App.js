/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AutoInputScreen from './pages/AutoInputScreen';
import InternalFileScreen from './pages/InternalFileScreen';
import HomeScreen from './pages/HomeScreen';
import GoogleMapScreen from './pages/GoogleMapScreen';
import SqliteScreen from './pages/SqliteScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" headerMode="none">
        <Stack.Screen name="AutoInputScreen" component={AutoInputScreen} />
        <Stack.Screen name="InternalFileScreen" component={InternalFileScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GoogleMapScreen" component={GoogleMapScreen} />
        <Stack.Screen name="SqliteScreen" component={SqliteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
