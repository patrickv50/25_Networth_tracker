import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AssetScreen from '../screens/AssetScreen';
import LiabilityScreen from '../screens/LiabilityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Image, Text, View } from 'react-native';
import theme from '../theme'
import { Feather, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

// let focusedColor = '#da7'
let focusedColor = '#eee'
let unfocusedColor = '#494949'
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
                    maxWidth: 900,
                }
            }}
            initialRouteName='Home'
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: (({ focused }) =>
                (
                    <View style={{ alignItems: "center" }}>
                        {/* <Entypo name='list' size={30} color={theme.text} style={{ width: 30, fontWeight: '600' }} /> */}
                        <MaterialIcons name="grid-view" size={30} color={focused?focusedColor:unfocusedColor} style={{ width: 30, fontWeight: '600' }} />
                        <Text style={[{ color: focused ? focusedColor : unfocusedColor },
                        ]}>Net Worth</Text>
                    </View>

                ))
            }} />
            <Tab.Screen name="Assets" component={AssetScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <MaterialIcons name="attach-money" size={30} color={focused?focusedColor:unfocusedColor} style={{ width: 30, fontWeight: '600' }} />
                        {/* <Entypo name='wallet' size={30} color={unfocusedColor} style={{ width: 30, fontWeight: '600' }} /> */}
                        <Text style={{ color: focused ? focusedColor : unfocusedColor }}>Asset</Text>
                    </View>
                ))
            }} />
            <Tab.Screen name="Liability" component={LiabilityScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <MaterialCommunityIcons name="bank-minus" size={30} color={focused?focusedColor:unfocusedColor} style={{ width: 30, fontWeight: '600' }} />
                        {/* <Entypo name='credit-card' size={30} color={unfocusedColor} style={{ width: 30, fontWeight: '600' }} /> */}
                        <Text style={{ color: focused ? focusedColor : unfocusedColor }}>Liability</Text>
                    </View>
                ))
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <Entypo name="area-graph" size={30} color={focused?focusedColor:unfocusedColor} style={{ width: 30, fontWeight: '600' }} />
                        <Text style={{ color: focused ? focusedColor : unfocusedColor }}>Projection</Text>
                    </View>
                ))
            }} />
        </Tab.Navigator>


    )
}

export default BottomNav