import { useEffect, useMemo, useRef, useState } from "react"
import { Animated, Button, StyleSheet, Text, View } from "react-native"
import theme from "../theme"
// const netWorth=333
// const sliderWidth = 50
const Header = ({ netWorth }) => {
    const [numx, setNumx] = useState(1)
    const [bar, setCharAr] = useState([])
    useEffect(() => {
        console.log(netWorth)
        setCharAr(String(netWorth).split(""))
    }, [netWorth])
    return (
        <>
            <View>
                <Text style={styles.subtitle1}>Net Worth</Text>
            </View>
            <View style={styles.numberCounter} >
                <Text style={{ fontSize: 36, color: theme.text }}>$</Text>
                {bar.map((val, index) => (
                    <Number key={index} value={val} index={index} />
                ))}
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    numberCounter: {
        // backgroundColor: 'red',
        height: 50,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    numberSlide: {
        alignContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        // top: -100,

    },
    number: {
        // display: 'flex',
        // flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'green',
        height: 50,
        fontSize: 35,
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.text
    },
    subtitle1: {
        fontSize: 15,
        color: '#888'
    },
})

export default Header

const Number = ({ value, index }) => {
    const position = useMemo(() => {
        switch (value) {
            case '-': return 10
            case ',': return 11
            default: return value
        }
    }, [value])
    const sliderContainerWidth = useMemo(() => {
        switch (value) {
            case '1': return 16
            case '7': return 17
            case '-': return 15
            case ',': return 7
            default: return 21
        }
    }, [value])
    const slideAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: position * -50,
            duration: 500,
            useNativeDriver: false,
            // delay:Math.random()*2000
            delay:500
        }).start()
    }, [position])
    return (
        <View style={{ width: sliderContainerWidth }}>
            <Animated.View style={[styles.numberSlide, {
                top: slideAnim,
            }]}>
                <Text style={styles.number}>0</Text>
                <Text style={styles.number}>1</Text>
                <Text style={styles.number}>2</Text>
                <Text style={styles.number}>3</Text>
                <Text style={styles.number}>4</Text>
                <Text style={styles.number}>5</Text>
                <Text style={styles.number}>6</Text>
                <Text style={styles.number}>7</Text>
                <Text style={styles.number}>8</Text>
                <Text style={styles.number}>9</Text>
                <Text style={styles.number}>-</Text>
                <Text style={styles.number}>,</Text>
                <Text style={styles.number}>M</Text>
                <Text style={styles.number}>0</Text>
            </Animated.View>
        </View>

    )
}