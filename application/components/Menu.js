import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons';

const Menu = ({menuOpen,setMenuOpen,remove}) => {

    return (
        <View style={{ display: menuOpen ? 'flex' : 'none', position: 'absolute', backgroundColor: 'white', padding: 12, width: 150, top: 150, right: 0, borderTopLeftRadius: 18, borderBottomLeftRadius: 18, zIndex: 500, }}>
            <TouchableOpacity>
                <View style={{ padding: 6, marginVertical: 4, flexDirection: 'row', backgroundColor: 'orange', borderRadius: 7 }}>
                    <Entypo name="edit" size={18} color='#111' style={{ marginRight: 4, fontWeight: '600' }} />
                    <Text style={{ fontSize: 16 }}>Edit</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>remove()}>
                <View style={{ padding: 6, marginVertical: 4, flexDirection: 'row', backgroundColor: 'orange', borderRadius: 7 }}>
                    <Entypo name="trash" size={18} color='#111' style={{ marginRight: 4, fontWeight: '600' }} />
                    <Text style={{ fontSize: 16 }}>Delete</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuOpen(false)}>
                <View style={{ padding: 6, marginVertical: 4, flexDirection: 'row', backgroundColor: 'orange', borderRadius: 7 }}>
                    <AntDesign name="close" size={18} color='#111' style={{ marginRight: 4, fontWeight: '600' }} />
                    <Text style={{ fontSize: 16 }}>Close</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Menu