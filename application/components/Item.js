import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Animated, Button, FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import theme from "../theme"
import NumberSlides from "./NumberSlides"
import { Entypo, Feather } from '@expo/vector-icons';
import Menu from "./Menu";
import { useSelector } from "react-redux";

const heightOfItem = 34

const Item = ({ item, index, icon, modalOpen, setMenuOpen, setFocusedAsset, total }) => {
    const [accordionOpen, setAccordionOpen] = useState(false)
    const heightAnim = useRef(new Animated.Value(0)).current

    const toggleAccordion = () => {
        if (accordionOpen) {
            setAccordionOpen(false)
            animateHeight(false)
        }
        else {
            if (item.top3.length > 0) {
                animateHeight(true)
                setAccordionOpen(true)
            }
        }
    }
    const toggleInfo = (obj) => {
        setFocusedAsset(obj)
        setMenuOpen(true)
    }
    const animateHeight = useCallback((x) => {
        Animated.timing(heightAnim, {
            toValue: x ? Math.min(200, item.top3.length * (heightOfItem + 4)) + 16 + (item.items.length > 0 ? 30 : 0) : 0,
            duration: 400,
            useNativeDriver: false,
            delay: 0
        }).start()
    }, [item.top3, item.items])

    useEffect(() => {
        if (item.top3.length === 0) {
            setAccordionOpen(false)
            animateHeight(false)
        }
        if (accordionOpen && item.top3.length > 0) {
            animateHeight(true)
        }
    }, [item.top3])
    return (
        <View key={index} style={styles.card}>
            {/* CARD HEADER */}
            <TouchableOpacity onPress={toggleAccordion}>
                <View style={styles.cardHeader}>
                    <Entypo name={icon.name} size={20} color={icon.color} style={{ width: 30 }} />
                    <Text style={styles.nameContainer}>{item.categoryName || "No Name"}</Text>
                    {/* <Text style={styles.totalContainer}>${(total).toLocaleString("en-US")}</Text> */}
                    <NumberSlides value={total} size={30} fontWeight='normal' delay={index * 240} modalOpen={modalOpen} side='right' duration={700} />
                </View>
            </TouchableOpacity>
            {/* CARD BODY */}
            <Animated.View style={[styles.cardBody, {
                height: heightAnim
            }]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={item.top3}
                    renderItem={(item, index) => {
                        return (
                            // <View style={styles.assetContainer}>
                            //     <Text style={styles.assetName} numberOfLines={1}>{item.item.name}</Text>
                            //     <View style={styles.cardBarContainer}>
                            //         <View style={[styles.cardBar, { backgroundColor: icon.color, width: `${(item.item.value / total) * 100}%` }]}></View>
                            //     </View>
                            //     <Text style={styles.assetValue}>${(item.item.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            //     <TouchableOpacity onPress={() => toggleInfo(item.item)}>
                            //         <Feather name="info" size={17} color='rgb(200, 170, 0)' style={{ marginLeft: 4 }} />
                            //     </TouchableOpacity>
                            // </View>
                            <AssetContainer item={item} accordionOpen={accordionOpen} toggleInfo={toggleInfo} icon={icon} total={total} />
                        )
                    }}
                    keyExtractor={(x) => x.id}
                    ListHeaderComponent={<View style={{ minHeight: 8 }} />}
                />
                {item.top3.length + item.items.length > 3 && <TouchableOpacity>
                    <Text style={{ color: theme.text, padding: 4, textAlign: 'center', textDecorationLine: 'underline' }}>View All {item.items.length + 3} </Text>
                </TouchableOpacity>}
            </Animated.View>
        </View>
    )
}

const AssetContainer = ({ item, index, toggleInfo, icon, total, accordionOpen }) => {
    const containerTop = useRef(new Animated.Value(40)).current
    const animateHeight = useCallback((x,instant) => {
        Animated.timing(containerTop, {
            toValue: x,
            duration: instant?0:600,
            useNativeDriver: false,
            delay: (instant?2:item.index) * 100
        }).start()
    }, [item.top3, item.items, index,accordionOpen])
    useEffect(() => {
        console.log(accordionOpen)
        if(accordionOpen)animateHeight(0)
        else animateHeight(40,true)
    }, [accordionOpen])
    return (
        <View style={[{ width: '100%', minHeight: heightOfItem-6,marginVertical:3, overflow: 'hidden',backgroundColor:'transparent' }]}>
            <Animated.View style={[styles.assetContainer, {
                top: containerTop,
                position: 'absolute',
                left: 0
            }]}>
                <Text style={styles.assetName} numberOfLines={1}>{item.item.name}</Text>
                <View style={styles.cardBarContainer}>
                    <View style={[styles.cardBar, { backgroundColor: icon.color, width: `${(item.item.value / total) * 100}%` }]}></View>
                </View>
                <Text style={styles.assetValue}>${(item.item.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                <TouchableOpacity onPress={() => toggleInfo(item.item)}>
                    <Feather name="info" size={17} color='rgb(200, 170, 0)' style={{ marginLeft: 4 }} />
                </TouchableOpacity>
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
        zIndex: 1,
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
        width: '100%',
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