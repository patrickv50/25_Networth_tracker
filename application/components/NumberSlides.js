import React from 'react'
import { useEffect, useMemo, useRef, useState } from "react"
import { Animated, Button, Easing, StyleSheet, Text, View } from "react-native"
import theme from "../theme"

let side = 'right'
let chars = [' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', ',', '$', 'M' ]

const NumberSlides = ({ value, size, delay, modalOpen }) => {
    const [chars, setCharAr] = useState(["$", "0"])
    useEffect(() => {
        let newVal = ('$' + (value)).split("")
        let size1 = chars.length
        let size2 = newVal.length
        if (size2 > size1) {
            let ar1 = new Array(size2 - size1).fill(" ")
            ar1.push(...newVal)
            setCharAr(ar1)
        } else {
            let ar1 = new Array(size1 - size2).fill(" ")
            ar1.push(...newVal)
            setCharAr(ar1)
        }

    }, [value])
    return (
        <View style={[styles.numberCounter, { height: size }]} >
            {chars.map((val, index) => {
                return (
                    <Number modalOpen={modalOpen} key={index} value={val} index={index} size={size} delay={delay} />
                )
            })}
        </View>
    )
}

const StaticNumber = ({ value, size }) => {
    const derivedStyle = {
        height: size,
        fontSize: Math.floor(size * 2 / 3)
    }
    const width = useMemo(() => {
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
    return (
        <View style={{ width: width }}>
            <Text style={[styles.number,derivedStyle,]}>{value}</Text>
        </View>
    )
}

const Number = ({ value, size, delay, modalOpen }) => {
    const [showStatic, setShowStatic] = useState(false)
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
    const width = useMemo(() => {
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
    useEffect(() => {
        setShowStatic(false)
    }, [value])
    const slideAnim = useRef(new Animated.Value(0)).current;
    const widthAnim = useRef(new Animated.Value(size * (3 / 10))).current;
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: position * -size,
            duration: 800,
            useNativeDriver: false,
            delay: delay + Math.floor(Math.random() * (1000 - 100) + 100),
            easing: Easing.easing
        }).start(({ finished }) => {
            if(finished)setShowStatic(true)
        })
        Animated.timing(widthAnim, {
            toValue: width,
            duration: 300,
            useNativeDriver: false,
            delay: delay + 500
        }).start()
    }, [position])

    if (showStatic) return (
        <>
            <StaticNumber value={value} size={size} />
        </>
    )



    else return (
        <Animated.View style={{ width: widthAnim }}>
            <Animated.View style={[styles.numberSlide, {
                top: slideAnim,
            }]}>
                {chars.map(char=>(
                    <Text key={char} style={[derivedStyle,styles.number]}>{char}</Text>
                ))}
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
        textAlign: 'center',
        color: theme.text
    },
})

export default NumberSlides