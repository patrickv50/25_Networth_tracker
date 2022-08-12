import { useEffect, useMemo, useRef, useState } from "react"
import { Animated, Button, FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import theme from "../theme"
import NumberSlides from "./NumberSlides"
import { Entypo, Feather } from '@expo/vector-icons';
import Menu from "./Menu";

const heightOfItem = 38

const Item = ({ item, index, icon, modalOpen,setMenuOpen  }) => {
    const [accordionOpen, setAccordionOpen] = useState(false)
    const total = useMemo(() => item.items.reduce((a, b) => a + b.value, 0))
    const heightAnim = useRef(new Animated.Value(0)).current

    const toggleAccordion = () => {
        let newState = !accordionOpen
        setAccordionOpen(newState)
        animateHeight(newState)
    }

    const animateHeight = (newState) => {
        Animated.timing(heightAnim, {
            toValue: newState ? Math.min(200, item.items.length * (heightOfItem + 4)) + 16 : 0,
            duration: 250,
            useNativeDriver: false,
            delay: 0
        }).start()
    }
    useEffect(() => {
        animateHeight(accordionOpen)
    }, [item])
    return (
        <View key={index} style={styles.card}>
            {/* CARD HEADER */}
            <TouchableOpacity onPress={toggleAccordion}>
                <View style={styles.cardHeader}>
                    <Entypo name={icon.name} size={20} color={icon.color} style={{ width: 30 }} />
                    <Text style={styles.nameContainer}>{item.categoryName || "No Name"}</Text>
                    {/* <Text style={styles.totalContainer}>${(total).toLocaleString("en-US")}</Text> */}
                    <NumberSlides value={(total).toLocaleString("en-US")} size={30} delay={index * 240} modalOpen={modalOpen} />
                </View>
            </TouchableOpacity>
            {/* CARD BODY */}
            <Animated.View style={[styles.cardBody, {
                height: heightAnim
            }]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={item.items}
                    renderItem={(item, index) => {
                        return (
                            <View key={index} style={styles.assetContainer}>
                                <Text style={styles.assetName} numberOfLines={1}>{item.item.name}</Text>
                                <View style={styles.cardBarContainer}>
                                    <View style={[styles.cardBar, { backgroundColor: icon.color, width: `${(item.item.value / total) * 100}%` }]}></View>
                                </View>
                                <Text style={styles.assetValue}>${(item.item.value).toLocaleString("en-US")}</Text>
                                <TouchableOpacity onPress={() => setMenuOpen(true)}>
                                    <Feather name="info" size={17} color='rgb(200, 170, 0)' style={{ marginLeft: 4 }} />
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    ListHeaderComponent={<View style={{ minHeight: 8 }} />}
                />
            </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: theme.cardBg,
        marginBottom: 12,
        borderRadius: 7,
        borderColor: '#eee',
        // overflow: 'hidden',
        zIndex:1,
    },
    cardHeader: {
        alignItems: 'center',
        paddingVertical: 19,
        paddingHorizontal: 16,
        flexDirection: 'row'
    },
    nameContainer: {
        flex: 1,
        fontSize: 20,
        color: theme.text
    },
    totalContainer: {
        fontSize: 17,
        color: theme.text
    },
    cardBody: {
        flex: 1,
        overflow: 'hidden',
        paddingHorizontal: 15,
        backgroundColor: '#252526',
        minHeight: 0,
        height: 0,
        // maxHeight:2
    },
    assetContainer: {
        overflow: 'hidden',
        height: heightOfItem,
        // backgroundColor:'red',
        marginVertical: 2,
        alignItems: 'center',
        flexDirection: 'row',
        // paddingVertical: 4,
    },
    assetName: {
        flex: 2,
        color: theme.text,
        minHeight: 0,
    },
    assetValue: {
        flex: 2,
        fontSize: 15,
        color: theme.text,
        textAlign: 'right'
    },
    cardBarContainer: {
        marginHorizontal: 20,
        flex: 3,
        minHeight: 5,
        overflow: 'hidden',
        borderRadius: 2,
        backgroundColor: '#444',
        // width: '100%',
    },
    cardBar: {
        position: 'absolute',
        top: 0,
        right: 0,
        minHeight: 5,
        borderRadius: 2,
    },

})
export default Item