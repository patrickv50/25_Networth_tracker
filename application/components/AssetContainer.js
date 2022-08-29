import { useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from "../ThemeContext";
import { nFormatter } from "../utils/numberFormatter";
const heightOfItem = 40

const AssetContainer = ({ item, index,color, toggleInfo, total, accordionOpen }) => {
    const curTheme = useContext(ThemeContext)
    const styles = useMemo(() => {
        return getTheme(curTheme)
    }, [curTheme])

    const containerTop = useRef(new Animated.Value(heightOfItem)).current
    const animateHeight = useCallback((x, instant) => {
        Animated.timing(containerTop, {
            toValue: x,
            duration: instant ? 0 : 620,
            useNativeDriver: false,
            delay: (instant ? 200 : (item.index * item.index*.6) * 15),
            easing: Easing.bezier(0.61, 1, 0.88, 1)
        }).start()
    }, [item.top3, item.items, index, accordionOpen])
    useEffect(() => {
        if (accordionOpen) animateHeight(0)
        else animateHeight(40, true)
    }, [accordionOpen])
    return (
        <View style={[{ width: '100%', minHeight: heightOfItem - 6, marginVertical: 3, overflow: 'hidden' }]}>
            <Animated.View style={[styles.assetContainer, {
                top: containerTop,
                position: 'absolute',
                left: 0
            }]}>
                <Text style={styles.assetName} numberOfLines={1}>{item.item.name}</Text>
                <View style={styles.cardBarContainer}>
                    <View style={[styles.cardBar, { backgroundColor:color, width: `${(item.item.value / total) * 100}%` }]}></View>
                </View>
                <Text style={styles.assetValue}>${nFormatter(item.item.value)}</Text>
                <TouchableOpacity onPress={() => toggleInfo(item.item)}>
                    <Feather name="info" size={17} color='rgb(200, 170, 0)' style={{ marginLeft: 4 }} />
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}
const getTheme = (theme)=> StyleSheet.create({
    assetContainer: {
        width: '100%',
        overflow: 'hidden',
        height: heightOfItem,
        marginVertical: 2,
        alignItems: 'center',
        flexDirection: 'row',
    },
    assetName: {
        flex: 2,
        fontSize: 16,
        color: theme.text,
        minHeight: 0,
    },
    assetValue: {
        flex: 2,
        fontSize: 17,
        fontWeight: '400',
        color: theme.text,
        textAlign: 'right'
    },
    cardBarContainer: {
        marginHorizontal: 20,
        flex: 3,
        minHeight: 7,
        overflow: 'hidden',
        borderRadius: 2,
        backgroundColor: '#444',
    },
    cardBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        minHeight: 7,
        borderRadius: 2,
    },

})
export default AssetContainer