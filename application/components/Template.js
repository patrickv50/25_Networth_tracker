import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import theme from '../theme'
const Template = ({ children }) => {
    return (
        <View style={styles.app}>
            <StatusBar hidden={false} style="light" />
            {children}
        </View>
    )
}

export default Template

const styles = StyleSheet.create({
    app: {
        flexGrow: 1,
        backgroundColor: theme.bg,
        borderColor: 'red',
        // borderWidth:2
    },
})