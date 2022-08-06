import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AssetScreen from '../screens/AssetScreen';
import LiabilityScreen from '../screens/LiabilityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Image, View } from 'react-native';
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
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 27,
                                height: 27,
                                tintColor: focused ? '#fff' : "#b2b2b2"
                            }}
                        />
                    </View>
                ))
            }} />
            <Tab.Screen name="Assets" component={AssetScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/money.png')}
                            resizeMode='contain'
                            style={{
                                width: 27,
                                height: 27,
                                tintColor: focused ? '#fff' : "#b2b2b2"
                            }}
                        />
                    </View>
                ))
            }} />
            <Tab.Screen name="Liability" component={LiabilityScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/card.png')}
                            resizeMode='contain'
                            style={{
                                width: 27,
                                height: 27,
                                tintColor: focused ? '#fff' : "#b2b2b2"
                            }}
                        />
                    </View>
                ))
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/user.png')}
                            resizeMode='contain'
                            style={{
                                width: 27,
                                height: 27,
                                tintColor: focused ? '#fff' : "#b2b2b2"
                            }}
                        />
                    </View>
                ))
            }} />
        </Tab.Navigator>


    )
}

export default BottomNav