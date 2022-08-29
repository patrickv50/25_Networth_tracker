import React from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import { Entypo, } from '@expo/vector-icons';
import { Animated, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { ThemeContext } from '../ThemeContext'
import { nFormatter } from '../utils/numberFormatter'
import TextComp from './shared/TextComp'

const heightOfItem = 25

const ProjectionCard = ({ entity, title, total, addEnabled }) => {
    // console.log(entity)
    const curTheme = useContext(ThemeContext)
    const styles = useMemo(() => {
        return getTheme(curTheme)
    }, [curTheme])
    const [accordionOpen, setAccordionOpen] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [addingTo, setAddingTo] = useState('')

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
            toValue: x ? heightOfItem * listData.length + 8 : 0,
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
    const heightAnim = useRef(new Animated.Value(heightOfItem * listData.length + 8)).current

    const handleSubmit = () => {

    }
    const handleAddPress = () =>{
        setAddingTo(title)
        setModalOpen(x => !x)
    }
    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.cardHeader} onPress={() => toggleAccordion()}>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'right', alignItems: 'center' }}>
                    <TextComp style={styles.label} textAlign='left'>{title}</TextComp>
                    {addEnabled&&<TouchableOpacity onPress={() =>handleAddPress(title)}>
                        <Entypo name='plus' size={22} color={curTheme.green} style={{ textAlign: 'center', overflow: 'hidden', width: 30, backgroundColor: 'transparent' }} />
                    </TouchableOpacity>}
                </View>
                <Text style={[styles.value, { flex: 1, textAlign: 'right' }]}>
                    ${nFormatter(total,2)}
                </Text>
            </TouchableOpacity>
            <Animated.View style={[styles.cardBody, {
                height: heightAnim
            }]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={listData}
                    renderItem={({ item }) => <ItemContainer item={item} styles={styles} curTheme={curTheme} />}
                    keyExtractor={(x, index) => index}
                    ListHeaderComponent={<View style={{ minHeight: 8 }} />}
                />

            </Animated.View>
            {/* DIVIDER MODAL =================== */}
            <Modal visible={modalOpen}>
                <View style={styles.modalHeader}>
                 
                    <TouchableOpacity onPress={() => setModalOpen(false)}>
                        <Entypo name='cross' size={30} color={curTheme.red} style={{ marginLeft: 12, textAlign: 'center', overflow: 'hidden', width: 30, backgroundColor: 'transparent' }} />
                    </TouchableOpacity>
                    <View>
                        <TextComp>{addingTo}</TextComp>
                    </View>
                </View>
                <View style={styles.modalBody}>
                    <View style={styles.row}>
                        <Text style={styles.inputLabel}>Name</Text>
                        <TextInput selectionColor={'rgb(145,250,147)'} autoFocus={true} value={name} returnKeyType='done' style={[styles.value, { flex: 1, textAlign: 'right' }]} onChangeText={(x) => setName(x)} />
                    </View>
                    {/* SHARE COUNT INPUT =======*/}
                    <View style={styles.row}>
                        <Text style={styles.inputLabel}>Value</Text>
                        <TextInput selectionColor={'rgb(145,250,147)'} autoFocus={false} value={value} keyboardType='number-pad' returnKeyType='done' style={[styles.value, { flex: 1, textAlign: 'right' }]} onChangeText={(x) => setValue(x)} />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                        <Text numberOfLines={2} style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
const ItemContainer = ({ item, styles }) => {
    return (
        <View style={styles.itemContainer}>
            <TextComp weight='200'>{item.categoryName}</TextComp>
            <TextComp>{nFormatter(item.total,2)}</TextComp>
        </View>
    )
}
const getTheme = (theme) => StyleSheet.create({
    card: {
        backgroundColor: theme.cardBg,
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        padding: 12,
    },
    label: {
        fontWeight: '400',
        color: theme.text,
        fontSize: 20
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.text,
    },
    cardBody: {
    },
    // ITEM CONTAINER DIVIDER
    itemContainer: {
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'red',
        // borderWidth:1,
        height: heightOfItem
    },
    // ITEM CONTAINER DIVIDER
    modalHeader: {
        paddingTop: theme.statusBar
    },
    // MODAL DIVIDER
    modalBody: {
        padding: 16
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 18,
        borderBottomWidth: .8,
        borderColor: '#444'
    },
    inputLabel: {
        // fontWeight: '300',
        flex: 1,
        color: theme.text,
        fontSize: 16
    },
    value: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: theme.text,
    },
    addButton: {
        textAlign: 'center',
        backgroundColor: theme.green,
        marginVertical: 4,
        borderRadius: 4,
        padding: 5,
        flex: 0,
        // backgroundColor:'blue'
    },
    addButtonText: {
        color: theme.text,
        fontWeight: 'bold',
        fontSize: 18,
        padding: 3,
        textAlign: 'center'
    },

})
export default ProjectionCard