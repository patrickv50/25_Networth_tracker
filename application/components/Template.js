import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useMemo } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { ThemeContext } from '../ThemeContext'
const Template = ({ children }) => {
    const curTheme = useContext(ThemeContext)
    const styles = useMemo(() => {
        return getTheme(curTheme)
    }, [curTheme])

    return (
        <View style={styles.app}>
            <View style={styles.body}>
                <StatusBar hidden={false} barStyle='light-content' />
                <View style={{
                    zIndex: 2,
                    flex: 1,
                }}>
                    {children}
                </View>
                <LinearGradient
                    colors={[curTheme.gradientTo, curTheme.gradientFrom]}
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
const getTheme = (theme) =>{
    return  StyleSheet.create({
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
            padding: 20
        }
    })
}
