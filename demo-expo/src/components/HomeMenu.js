import React, { Component } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import CreatePost from "../screens/CreatePost";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ScreenAnidada from "../screens/ScreenAnidada";

const Tab = createBottomTabNavigator();

class HomeMenu extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Tab.Navigator Options={{ headerShown: false }}>
                <Tab.Screen
                    name="Home"
                    component={ScreenAnidada}
                    options={
                        {
                            tabBarIcon: () =>
                                <AntDesign name="home" size={24} color="black" />
                        }} />
                <Tab.Screen
                    name="CreatePost"
                    component={CreatePost}
                    options={{
                        tabBarIcon: () => (
                            <AntDesign name="plus" size={24} color="black" />
                        ),
                        
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={
                        {
                            tabBarIcon: () =>
                                <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />
                        }}
                />
            </Tab.Navigator>
        );
    }
}

export default HomeMenu;