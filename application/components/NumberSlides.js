import React from 'react'
import { useEffect, useMemo, useRef, useState } from "react"
import { Animated, Button, Easing, StyleSheet, Text, View } from "react-native"
import theme from "../theme"

let side = 'right'


const NumberSlides = ({ value, size, delay }) => {
    const [chars, setCharAr] = useState([])
    useEffect(() => {
        let newVal = ('$' + (value)).split("")
        let size1 = chars.length
        let size2 = newVal.length
        if (size2 > size1) {
            let ar1 = new Array(size2 - size1).fill(" ")
            
            setCharAr(newVal)
        } else {
            let ar1 = new Array(size1 - size2).fill(" ")
            ar1.push(...newVal)
            setCharAr(ar1)
        }

    }, [value])
    return (
        <View style={[styles.numberCounter, { height: size }]} >
            {chars && chars.map((val, index) => (
                <Number key={index} value={val} index={index} size={size} delay={delay} />
            ))}
        </View>
    )
}


const Number = ({ value, index, size, delay }) => {
    const derivedStyle = {
        height: size,
        fontSize: Math.floor(size * 2 / 3)
    }
    const position = useMemo(() => {
        switch (value) {
            case ' ': return 0
            case '-': return 11
            case ',': return 12
            case '$': return 13
            default: return parseInt(value) + 1
        }
    }, [value])
    const sliderContainerWidth = useMemo(() => {
        switch (value) {
            case ' ': return size * (20 / 50)
            case '0': return size * (21 / 50)
            case '1': return size * (16 / 50)
            case '7': return size * (23 / 50)
            case '-': return size * (15 / 50)
            case ',': return size * (7 / 50)
            default: return size / 2
        }
    }, [value])
    const slideAnim = useRef(new Animated.Value(0)).current;
    const widthAnim = useRef(new Animated.Value(size * (3 / 10))).current;
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: position * -size,
            duration: 800,
            useNativeDriver: false,
            delay: delay + Math.floor(Math.random() * (1000 - 200) + 200),
            easing: Easing.easing
        }).start()
        Animated.timing(widthAnim, {
            toValue: sliderContainerWidth,
            duration: 300,
            useNativeDriver: false,
            delay: delay + 500
        }).start()
    }, [position])
    return (
        <Animated.View style={{ width: widthAnim }}>
            <Animated.View style={[styles.numberSlide, {
                top: slideAnim,
            }]}>
                <Text style={[styles.number, derivedStyle]}> </Text>
                <Text style={[styles.number, derivedStyle]}>0</Text>
                <Text style={[styles.number, derivedStyle]}>1</Text>
                <Text style={[styles.number, derivedStyle]}>2</Text>
                <Text style={[styles.number, derivedStyle]}>3</Text>
                <Text style={[styles.number, derivedStyle]}>4</Text>
                <Text style={[styles.number, derivedStyle]}>5</Text>
                <Text style={[styles.number, derivedStyle]}>6</Text>
                <Text style={[styles.number, derivedStyle]}>7</Text>
                <Text style={[styles.number, derivedStyle]}>8</Text>
                <Text style={[styles.number, derivedStyle]}>9</Text>
                <Text style={[styles.number, derivedStyle]}>-</Text>
                <Text style={[styles.number, derivedStyle]}>,</Text>
                <Text style={[styles.number, derivedStyle]}>$</Text>
                <Text style={[styles.number, derivedStyle]}>M</Text>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    numberCounter: {
        flexDirection: 'row',
        overflow: 'hidden',
    },
    numberSlide: {
        alignContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
    },
    number: {
        textAlign:'center',
        // borderColor:'red',
        // borderWidth:1,
        color: theme.text
    },
})

export default NumberSlides