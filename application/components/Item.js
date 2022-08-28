import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import NumberSlides from "./NumberSlides"
import { Entypo, } from '@expo/vector-icons';
import AssetContainer from "./AssetContainer";
import { ThemeContext } from "../ThemeContext";

const heightOfItem = 40

const Item = ({ inputEnabled, handleNavigate, category, index, setMenuOpen, setFocusedAsset }) => {
    const [accordionOpen, setAccordionOpen] = useState(false)
    const heightAnim = useRef(new Animated.Value(0)).current
    const curTheme = useContext(ThemeContext)
    const styles = useMemo(() => {
        return getTheme(curTheme)
    }, [curTheme])

    const toggleAccordion = () => {
        if (accordionOpen) {
            setAccordionOpen(false)
            animateHeight(false)
        }
        else {
            if (category.top3.length > 0) {
                animateHeight(true)
                setAccordionOpen(true)
            }
        }
    }
    const toggleInfo = (obj) => {
        setFocusedAsset({
            category: category,
            item: obj
        })
        setMenuOpen(true)
    }
    const animateHeight = useCallback((x) => {
        Animated.timing(heightAnim, {
            toValue: x ? Math.min(200, category.top3.length * (heightOfItem + 4)) + 16 + (category.items.length > 0 ? 30 : 0) : 0,
            duration: 300,
            useNativeDriver: false,
            delay: 0,
        }).start()
    }, [category.top3, category.items])

    useEffect(() => {
        if (category.top3.length === 0) {
            setAccordionOpen(false)
            animateHeight(false)
        }
        if (accordionOpen && category.top3.length > 0) {
            animateHeight(true)
        }
    }, [category.top3])
    return (
        <View style={styles.card}>
            {/* CARD HEADER */}
            <TouchableOpacity onPress={toggleAccordion}>
                <View style={styles.cardHeader}>
                    <Entypo name={category.icon} size={20} color={category.color} style={{ width: 30 }} />
                    <Text style={styles.nameContainer}>{category.categoryName || "No Name"}</Text>
                    {/* <Text style={styles.totalContainer}>${(total).toLocaleString("en-US")}</Text> */}
                    {inputEnabled ?
                        <TouchableOpacity onPress={() => handleNavigate('Input', { category: category })} style={{ width: 30, borderWidth: 1, borderColor: category.color, alignItems: 'center', aspectRatio: 1, borderRadius: 4, justifyContent: 'center' }}>
                            <Entypo name="plus" size={20} color={category.color} style={{}} />
                        </TouchableOpacity> :
                        <NumberSlides value={category.total} size={30} fontWeight='normal' delay={index * 240} side='right' duration={700} />}
                </View>
            </TouchableOpacity>
            {/* CARD BODY */}
            <Animated.View style={[styles.cardBody, {
                height: heightAnim
            }]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={category.top3}
                    renderItem={(item) => <AssetContainer item={item} accordionOpen={accordionOpen} toggleInfo={toggleInfo} color={category.color} total={category.total} />}
                    keyExtractor={(x) => x.id}
                    ListHeaderComponent={<View style={{ minHeight: 8 }} />}
                />
                {category.items.length > 0 &&
                    <TouchableOpacity onPress={() => handleNavigate('AssetTable', category)}>
                        <Text style={{ color: curTheme.text, padding: 2, textAlign: 'center', textDecorationLine: 'underline' }}>View All {category.items.length + 3} </Text>
                    </TouchableOpacity>}
            </Animated.View>
        </View>
    )
}

const getTheme = (theme)=> StyleSheet.create({
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
        paddingVertical: 16,
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
        backgroundColor: theme.cardBgSecondary,
        minHeight: 0,
        height: 0,
        // maxHeight:2
    },
})
export default Item