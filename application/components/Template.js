import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import theme from '../theme'
const Template = ({ children }) => {
    return (
        <View style={styles.app}>
            <View style={styles.body}>
                <StatusBar hidden={false} style={{}} />
                <View style={{ flex: 1 }}>
                    {children}
                </View>
                <LinearGradient
                    colors={['rgba(0,0,0,.9)', 'rgba(6,6,6,.05)']}
                    style={{
                        height: 150,
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        zIndex: 99
                    }}
                    locations={[.55, .90]}
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
        alignItems:'center'
    },
    body: {
        width: '100%',
        maxWidth: 900,
        paddingTop: 40,
        // backgroundColor: theme.bg,
        flex: 1,
    }
})