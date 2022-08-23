import React from 'react'
import { useEffect, useMemo, useRef, useState } from "react"
import { Animated, Button, Easing, StyleSheet, Text, View } from "react-native"
import theme from "../theme"

let firstChar = ' '
// let charsAr = [firstChar, '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ',', '.', '$', 'M']

let maxSlides = 10
const NumberSlides = ({ value, size, delay, side,duration }) => {
    const [chars, setCharAr] = useState([])
    useEffect(() => {
        let stringVal = firstChar
        if (value > 1000000) {
            let whole = Math.floor(value / 1000000)
            let tenth = Math.floor((value - 1000000 * whole) / 100000)
            stringVal = (whole.toString() + "." + tenth.toString()) + 'M'
        } else {
            stringVal = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }

        let ar = ('$' + stringVal).split("")
        let ar2 = new Array(maxSlides - ar.length).fill(firstChar)
        if (side === 'right') {
            ar2.push(...ar)
            setCharAr(ar2)
        }
        else if (side === 'left') {
            ar.push(...ar2)
            setCharAr(ar)
        }
        else {
            let count = Math.floor((maxSlides - ar.length) / 2)
            let remainder = Math.ceil((maxSlides - ar.length) % 2)
            let ar3 = new Array(count + remainder).fill(firstChar)
            ar3.push(...ar)
            ar3.push(...new Array(count + remainder).fill(firstChar))
            setCharAr(ar3)
        }

    }, [value, side, size])
    return (
        <View style={[styles.numberCounter, { height: size }]} >
            {chars.map((val, index) => {
                return (
                    <Number key={index} value={val} index={index} size={size} delay={delay} duration={duration}/>
                )
            })}
        </View>
    )
}
// STATIC NUMBER COMPONENT
const StaticNumber = ({ value, size, derivedStyle }) => {
    const width = useMemo(() => {
        return getWidth(value)*size
    }, [value])
    return (
        <View style={{ width: width }}>
            <Text style={[styles.number, derivedStyle]}>{value === "M" ? "Million" : value}</Text>
        </View>
    )
}
// DYNAMIC NUMBER COMPONENT
const Number = ({ value, size, delay,duration }) => {
    const [showStatic, setShowStatic] = useState(true)
    const derivedStyle = {
        height: size,
        fontSize: value === "M" ? Math.floor(size * 2 / 4) : Math.floor(size * 3 / 4),
        paddingTop: value === "M" ? size / 3 : size / 12

    }
    const position = useMemo(() => {
        return getTop(value)*-size
    }, [value])

    const width = useMemo(() => {
        return getWidth(value)*size
    }, [value])

    const slideAnim = useRef(new Animated.Value(0)).current;
    const widthAnim = useRef(new Animated.Value(getWidth(value)*size)).current;
    useEffect(() => {
        setShowStatic(false)
        Animated.timing(slideAnim, {
            toValue: position,
            duration: 500,
            useNativeDriver: false,
            delay: delay + Math.floor(Math.random() * (800 - 0) + 0),
            easing: Easing.easing
        }).start(({ finished }) => {
            if (finished) setShowStatic(true)
            console.log('hello')
        })
        Animated.timing(widthAnim, {
            toValue: width,
            duration: duration/2,
            useNativeDriver: false,
            delay: delay + 500
        }).start()
    }, [position])

    // SHOW STATIC NUMBER IF DONT ANIMATING
    if (showStatic) return <StaticNumber value={value} size={size} derivedStyle={derivedStyle}/>
    // ELSE SHOW ANIMATION
    else return (
        <Animated.View style={{ width: widthAnim }}>
            <Animated.View style={[styles.numberSlide, {
                top: slideAnim,
            }]}>
                <Text style={[styles.number, derivedStyle]}>{firstChar}</Text>
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
                <Text style={[styles.number, derivedStyle]}>.</Text>
                <Text style={[styles.number, derivedStyle]}>$</Text>
                <Text style={[styles.number, derivedStyle]}>Million</Text>
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
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
    },
    number: {
        textAlign: 'center',
        color: theme.text
    },
})



// HELPER FUNCTIONS

const getWidth = (value) => {
    switch (value) {
        case firstChar: return (20 / 46)
        case '0': return (21 / 46)
        case '1': return (16 / 46)
        case '7': return (23 / 46)
        case '-': return (15 / 46)
        case ',': return (7 / 46)
        case '.': return (7 / 46)
        case 'M': return (67 / 46)
        default: return (25 / 46)
    }
}

const getTop = (value) =>{
    switch (value) {
        case firstChar: return 0
        case '-': return 11
        case ',': return 12
        case '.': return 13
        case '$': return 14
        case 'M': return 15
        default: return parseInt(value) + 1
    }
}
export default NumberSlides