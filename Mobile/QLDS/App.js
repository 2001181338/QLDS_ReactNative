import React from 'react';
import TabNavigation from './src/tab-navigation/tab-navigation';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuanLyDatVe from './src/dat-ve/quan-ly-dat-ve';
import ChonGa from './src/dat-ve/chon-ga';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="QuanLyDatVe" component={QuanLyDatVe} />
        <Stack.Screen name="ChonGa" component={ChonGa} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

function Home() {
  return (
    <TabNavigation></TabNavigation>
  );
}

