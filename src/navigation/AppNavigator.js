/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import Test_gh from '../screens/Test_gh';
import ChooseVirtualNumber from '../screens/ChooseVirtualNumber';


const Stack = createStackNavigator();


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name={'Splash'} component={Splash} options={{ headerShown: false }} screenOptions={{ navigationBarColor: 'transparent' }} />
        <Stack.Screen name={'Test_gh'} component={Test_gh} options={{ headerShown: false }} screenOptions={{ navigationBarColor: 'transparent' }} />
        <Stack.Screen name={'LoginScreen'} component={LoginScreen} options={{ headerShown: false }} screenOptions={{ navigationBarColor: 'transparent' }} />
        <Stack.Screen name={'Home'} component={Home} options={{ headerShown: false }} screenOptions={{ navigationBarColor: 'transparent' }} />
        <Stack.Screen name={'ChooseVirtualNumber'} component={ChooseVirtualNumber} options={{ headerShown: false }} screenOptions={{ navigationBarColor: 'transparent' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator