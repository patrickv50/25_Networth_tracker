import React from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ThemeContext } from '../ThemeContext'
import { nFormatter } from '../utils/numberFormatter'
import TextComp from './shared/TextComp'

const heightOfItem = 25

const ProjectionCard = ({ entity, title, total }) => {
    const curTheme = useContext(ThemeContext)
    const styles = useMemo(() => {
        return getTheme(curTheme)
    }, [curTheme])
    const [accordionOpen, setAccordionOpen] = useState(false)


    const toggleAccordion = () => {
        if (accordionOpen) {
            setAccordionOpen(false)
            animateHeight(false)
        }
        else {
            animateHeight(true)
            setAccordionOpen(true)
        }
    }

    const animateHeight = useCallback((x) => {
        Animated.timing(heightAnim, {
            toValue: x ? heightOfItem * listData.length+8 : 0,
            duration: 300,
            useNativeDriver: false,
            delay: 0,
        }).start()
    }, [listData])

    const listData = useMemo(() => {
        let arr = entity.reduce((a, b) => {
            let ar = [...a]
            if (b.total) ar.push(b)
            return ar
        }, [])
        return arr
    }, [entity])
    const heightAnim = useRef(new Animated.Value(0)).current

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.cardHeader} onPress={() => toggleAccordion()}>
                <TextComp style={styles.label} textAlign='left'>{title}</TextComp>
                <Text style={[styles.value, { flex: 1, textAlign: 'right' }]}>
                    ${nFormatter(total)}
                </Text>
            </TouchableOpacity>
            <Animated.View style={[styles.cardBody, {
                height: heightAnim
            }]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={listData}
                    renderItem={({item}) => <ItemContainer item={item} styles={styles}/>}
                    keyExtractor={(x, index) => index}
                    ListHeaderComponent={<View style={{ minHeight: 8 }} />}
                />

            </Animated.View>
        </View>
    )
}
const ItemContainer = ({item,styles}) =>{
    return(
        <View style={styles.itemContainer}>
            <TextComp weight='200'>{item.categoryName}</TextComp>
            <TextComp>{nFormatter(item.total)}</TextComp>
        </View>
    )
}
const getTheme = (theme) => StyleSheet.create({
    card:{
        backgroundColor: theme.cardBg,
        borderRadius:8,
        overflow:'hidden',
        marginVertical:4,
    },
    cardHeader: {
        flexDirection: 'row',
        padding: 12,
    },
    label: {
        fontWeight: '400',
        flex: 1,
        color: theme.text,
        fontSize: 16
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.text,
    },
    cardBody: {
    },
    // ITEM CONTAINER DIVIDER
    itemContainer:{
        paddingHorizontal:12,
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:'red',
        // borderWidth:1,
        height:heightOfItem
    }
})
export default ProjectionCard