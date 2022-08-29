import React, { useContext, useMemo, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons';
import TextComp from './shared/TextComp';
import { ThemeContext } from '../ThemeContext';

const Menu = ({ menuOpen, setMenuOpen, remove, goToDetail }) => {

    const curTheme = useContext(ThemeContext)
    const styles = useMemo(() => {
        return getTheme(curTheme)
    }, [curTheme])

    return (
        <View style={{ display: menuOpen ? 'flex' : 'none', position: 'absolute', backgroundColor: '#aaa', padding: 8, width: 150, top: 100, right: 0, borderTopLeftRadius: 6, borderBottomLeftRadius: 6, zIndex: 500, }}>
            {/* <TouchableOpacity>
                <View style={styles.container}>
                    <Entypo name="edit" size={18} color='#111' style={styles.icon} />
                    <TextComp style={{ fontSize: 16 }}>Edit </TextComp>
                </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => remove()}>
                <View style={styles.container}>
                    <Entypo name="trash" size={18} color={curTheme.text} style={styles.icon} />
                    <TextComp style={{ fontSize: 16 }}>Delete</TextComp>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToDetail}>
                <View style={styles.container}>
                    <Entypo name="dots-three-horizontal" size={18} color={curTheme.text} style={styles.icon} />
                    <TextComp style={{ fontSize: 16 }}>More</TextComp>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuOpen(false)}>
                <View style={styles.container}>
                    <AntDesign name="close" size={18} color={curTheme.text} style={[styles.icon, { color: curTheme.red }]} />
                    <TextComp style={{ fontSize: 16, color: curTheme.red }}>Close</TextComp>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const getTheme = (theme) => StyleSheet.create({
    container: {
        padding: 14,
        marginVertical: 4,
        flexDirection: 'row',
        backgroundColor: theme.cardBg,
        borderRadius: 7
    },
    icon: {
        // color: '#eeb',
        marginRight: 4,
    }
})

export default Menu