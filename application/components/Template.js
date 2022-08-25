import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import theme from '../theme'
const Template = ({ children }) => {
    return (
        <View style={styles.app}>
            <View style={styles.body}>
                <StatusBar hidden={false} barStyle='light-content' />
                <View style={{
                    flex: 1,
                    paddingTop: 60,
                }}>
                    {children}
                </View>
                <LinearGradient
                    colors={['rgba(5,5,10,.95)', 'rgba(0,0,0,0)']}
                    style={{
                        height: 150,
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        zIndex: 99
                    }}
                    locations={[.6, 1]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 1, y: 0 }}
                />
            </View>
        </View>
    )
}

export default Template

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: theme.bg,
        alignItems: 'center'
    },
    body: {
        width: '100%',
        maxWidth: 900,
        flex: 1,
    },
    statusBar: {
        backgroundColor: 'red',
        padding: 20
    }
})