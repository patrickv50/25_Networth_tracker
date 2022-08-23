import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Animated, Button, FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import theme from "../theme"
import NumberSlides from "./NumberSlides"
import { Entypo, Feather } from '@expo/vector-icons';
import Menu from "./Menu";
import { useSelector } from "react-redux";
import AssetContainer from "./AssetContainer";

const heightOfItem = 40

const Item = ({ item, index, category, setMenuOpen, setFocusedAsset, total,navigateToTable }) => {
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
            duration: 300,
            useNativeDriver: false,
            delay: 0,
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
                    <Entypo name={item.icon} size={20} color={item.color} style={{ width: 30 }} />
                    <Text style={styles.nameContainer}>{item.categoryName || "No Name"}</Text>
                    {/* <Text style={styles.totalContainer}>${(total).toLocaleString("en-US")}</Text> */}
                    <NumberSlides value={total} size={30} fontWeight='normal' delay={index * 240} side='right' duration={700} />
                </View>
            </TouchableOpacity>
            {/* CARD BODY */}
            <Animated.View style={[styles.cardBody, {
                height: heightAnim
            }]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={item.top3}
                    renderItem={(item, index) => <AssetContainer item={item} accordionOpen={accordionOpen} toggleInfo={toggleInfo} category={category} total={total} />}
                    keyExtractor={(x) => x.id}
                    ListHeaderComponent={<View style={{ minHeight: 8 }} />}
                />
                {item.items.length > 0 &&
                    <TouchableOpacity onPress={()=>navigateToTable(item)}>
                        <Text style={{ color: theme.text, padding: 4, textAlign: 'center', textDecorationLine: 'underline' }}>View All {item.items.length + 3} </Text>
                    </TouchableOpacity>}
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
        backgroundColor: '#212425',
        minHeight: 0,
        height: 0,
        // maxHeight:2
    },
})
export default Item