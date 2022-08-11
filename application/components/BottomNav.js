import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AssetScreen from '../screens/AssetScreen';
import LiabilityScreen from '../screens/LiabilityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Image, Text, View } from 'react-native';
import theme from '../theme'
import { Entypo } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const BottomNav = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    bottom: 20,
                    left: 20,
                    right: 20,
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    borderTopWidth: 0,
                    zIndex: 500,

                }
            }}
            initialRouteName='Home'
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <Entypo name='list' size={30} color={theme.text} style={{ width: 30, fontWeight: '600' }} />
                        <Text style={{ color: theme.text }}>Net Worth</Text>
                    </View>
                    
                ))
            }} />
            <Tab.Screen name="Assets" component={AssetScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <Entypo name='wallet' size={30} color={theme.text} style={{ width: 30, fontWeight: '600' }} />
                        <Text style={{ color: theme.text }}>Asset</Text>
                    </View>
                ))
            }} />
            <Tab.Screen name="Liability" component={LiabilityScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <Entypo name='credit-card' size={30} color={theme.text} style={{ width: 30, fontWeight: '600' }} />
                        <Text style={{ color: theme.text }}>Liability</Text>
                    </View>
                ))
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <Entypo name='user' size={30} color={theme.text} style={{ width: 30, fontWeight: '600' }} />
                        <Text style={{ color: theme.text }}>Profile</Text>
                    </View>
                ))
            }} />
        </Tab.Navigator>


    )
}

export default BottomNav