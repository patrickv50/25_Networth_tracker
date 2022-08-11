import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import theme from '../theme'
const Template = ({ children }) => {
    return (
        <View style={styles.app}>
            <View style={styles.body}>
                <StatusBar hidden={false} style={{backgroundColor:'red'}}/>
                <View style={{ flex: 1, }}>
                    {children}
                </View>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,.85)']}
                    style={{
                        height: 150,
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        zIndex: 99
                    }}
                    locations={[.15,1]}
                    start={{ x: 'opx', y: '0px' }}
                    end={{ x: '20px', y: '20px' }}
                />
            </View>
        </View>
    )
}

export default Template

const styles = StyleSheet.create({
    app: {
        flexGrow: 1,
        flex: 1,
        backgroundColor: theme.bg,
        borderColor: 'red',
        alignItems:'center',
        // borderWidth:2
    },
    body:{
        width:'100%',
        maxWidth: 900,
        paddingTop: 40,
        flexGrow: 1,
        flex: 1,
        backgroundColor: theme.bg,
        borderColor: 'red',
        // borderWidth:2
    }
})