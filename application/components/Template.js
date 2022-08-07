import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import theme from '../theme'
const Template = ({ children }) => {
    return (
        <View style={styles.app}>
            <StatusBar hidden={false} style="light" />
            <View style={{padding:20,flex:1,}}>
            {children}
            </View>
            <LinearGradient
                // Background Linear Gradient
                // colors={['transparent', 'rgba(0,0,0,0.8)']}
                colors={['transparent', 'rgba(0,0,0,.9)']}
                style={{
                    height: 170,
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 99
                }}
                start={{ x: 'opx', y: '0px' }}
                end={{ x: '20px', y: '20px' }}
            />
        </View>
    )
}

export default Template

const styles = StyleSheet.create({
    app: {
        paddingTop: 50,
        flexGrow: 1,
        flex:1,
        backgroundColor: theme.bg,
        borderColor: 'red',
        // borderWidth:2
    },
})