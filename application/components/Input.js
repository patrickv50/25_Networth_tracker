import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import theme from '../theme'
import { useDispatch } from 'react-redux'
import { Entypo, } from '@expo/vector-icons';
import StockInput from './input-screens/StockInput';
const Input = ({ category, setInputOpen, setModalOpen, add }) => {
    const [name, setName] = useState("")
    const [value, setValue] = useState("")
    const nameRef = useRef()
    const valueRef = useRef()

    const dispatch = useDispatch()

    const handleSubmit = () => {
        let val=Number(value.replace(",",""))
        if(!val)return
        setInputOpen(false)
        setModalOpen(false)
        dispatch(add({
            name, value:val, category: category.name
        }))
    }

    const handleCancel = () => {
        setModalOpen(false)
        setInputOpen(false)
    }

    if (category.name==='Stocks')return<StockInput setInputOpen={setInputOpen} setModalOpen={setModalOpen} add={add} />
    else return (
        <View style={styles.form}>
            <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',marginBottom:8 }}>
                <Entypo name={category.icon.name} size={20} color={category.icon.color} style={{ width: 25, marginBottom: 4, fontWeight: '600' }} />
                <Text style={{fontSize:18,color:theme.text}}>{category.name}</Text>
            </View>

            <TextInput placeholderTextColor="#999" style={styles.input} value={name} ref={nameRef} onChangeText={(x) => setName(x)} onSubmitEditing={() => valueRef.current.focus()} placeholder="Name" />
            <TextInput placeholderTextColor="#999" returnKeyType="done" keyboardType="number-pad" ref={valueRef} onSubmitEditing={handleSubmit} style={styles.input} value={value} onChangeText={x => {
                if (!x.length) setValue("")
                if (Number(x.replace(',', ''))) setValue(x)
            }
            } placeholder="Value" />
            <TouchableOpacity style={{ alignSelf: 'flex-start', marginBottom: 6 }} onPress={handleSubmit}>
                <Text style={{ fontSize: 12, color: '#888', marginVertical: 4 }}>{"Advance Fields >"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: 'transparent' }]} onPress={handleCancel}>
                <Text style={[styles.addButtonText, { fontSize: 15 }]}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    form: {
        width: '100%',
        padding: 20,
        alignItems: 'stretch'
    },
    input: {
        width: '100%',
        fontSize: 18,
        padding: 12,
        backgroundColor: theme.input,
        color: '#ccc',
        marginVertical: 4,
        borderRadius: 6
    },
    container: {
        justifyContent: 'center',
        backgroundColor: '#282828=a',
        padding: 20,
        borderRadius: 7,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    addButton: {
        alignSelf: 'flex-end',
        width: 150,
        backgroundColor: '#333',
        marginVertical: 4,
        borderRadius: 4,
        padding: 5,
        flex: 0,
        // backgroundColor:'blue'
    },
    addButtonText: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '400',
        padding: 3,
        textAlign: 'center'
    },

})