import { useEffect, useMemo, useRef, useState } from "react"
import { Animated, Button, Easing, StyleSheet, Text, View } from "react-native"
import theme from "../theme"
import NumberSlides from "./NumberSlides"

const Header = ({ netWorth }) => {

    return (
        <>
            <View>
                <Text style={styles.subtitle1}>Net Worth</Text>
                <NumberSlides value={netWorth} size={40} delay={0} />
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    subtitle1: {
        fontSize: 15,
        color: '#888'
    },
})



export default Header
