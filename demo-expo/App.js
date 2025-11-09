import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import HomeMenu from './src/components/HomeMenu';


const Stack = createNativeStackNavigator()


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} screenOptions={{ headerShown: false}}/>
                <Stack.Screen name='HomeMenu' component={HomeMenu} screenOptions={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} screenOptions={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}