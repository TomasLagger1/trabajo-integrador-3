import React, {Component} from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

class HomeMenu extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <Tab.Navigator screenOptions={{ headerShown: false}}>
                <Tab.Screen 
                name="Home" 
                component={Home} 
                options={
                    {tabBarIcon: () => 
                        <AntDesign name="home" size={24} color="black" />
                }}/>
                
                <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={
                    {tabBarIcon: () => 
                        <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />
                }}
                />
            </Tab.Navigator>
        );
    }
}

export default HomeMenu;