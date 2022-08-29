import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useRef } from 'react'
import { useState } from 'react'
import { Entypo, } from '@expo/vector-icons';
import { ThemeContext } from '../../ThemeContext';
import { useContext } from 'react';
import { useMemo } from 'react';

const BaseInput = ({ handleSubmit, cancel, category }) => {
    const [name, setName] = useState("")
    const [value, setValue] = useState("")
    const [deprecRate, setRate] = useState("")
    const [monthly, setMonthly] = useState("")
    const nameRef = useRef()
    const valueRef = useRef()
    const deprecRef = useRef()
    const curTheme = useContext(ThemeContext)
    const styles = useMemo(() => {
        return getTheme(curTheme)
    }, [curTheme])

    return (
        <KeyboardAvoidingView style={styles.form}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                <Entypo name={category.icon} size={24} color={category.color} style={{ width: 25, marginBottom: 4, fontWeight: '600' }} />
                <Text style={{ fontSize: 22, color: curTheme.text }}>{category.categoryName}</Text>
            </View>
            <TextInput placeholderTextColor="#999" style={styles.input} value={name} ref={nameRef} onChangeText={(x) => setName(x)} onSubmitEditing={() => valueRef.current.focus()} placeholder="Name" />
            <TextInput placeholderTextColor="#999" returnKeyType="done" keyboardType="number-pad" ref={valueRef} onSubmitEditing={() => deprecRef.current.focus()} style={styles.input} value={value} onChangeText={x => {
                if (!x.length) setValue("")
                if (Number(x.replace(',', ''))) setValue(x)
            }
            } placeholder="Value" />
            {!['Student Loans', 'Credit Card', 'Car Loan', 'Mortage'].includes(category.categoryName) ?
                <TextInput placeholderTextColor="#999" returnKeyType="done" keyboardType="number-pad" ref={deprecRef} onSubmitEditing={handleSubmit} style={styles.input} value={deprecRate} onChangeText={x => {
                    if (!x.length) setRate("")
                    if (Number(x.replace(',', ''))) setRate(x)
                }
                } placeholder="Depreciate %" />
                :
                <TextInput placeholderTextColor="#999" returnKeyType="done" keyboardType="number-pad" onSubmitEditing={handleSubmit} style={styles.input} value={monthly} onChangeText={x => {
                    if (!x.length) setMonthly("")
                    if (Number(x.replace(',', ''))) setMonthly(x)
                }
                } placeholder="Monthly Payment" />}
            {/* <TouchableOpacity style={{ alignSelf: 'flex-start', marginBottom: 6 }} onPress={handleSubmit}>
                <Text style={{ fontSize: 12, color: '#888', marginVertical: 4 }}>{"Advance Fields >"}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={[styles.addButton, { marginTop: 12 }]} onPress={() => handleSubmit({
                name: name,
                value: value,
                category: category.categoryName,
                deprecRate: deprecRate,
                monthly: Number(monthly)
            })}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: 'transparent' }]} onPress={cancel}>
                <Text style={[styles.addButtonText, { fontSize: 15, color: curTheme.text, }]}>Cancel</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default BaseInput
const getTheme = (theme) => StyleSheet.create({
    form: {
        flex: 1,
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '100%',
        fontSize: 18,
        padding: 12,
        backgroundColor: theme.input,
        color: theme.text,
        marginVertical: 5,
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
        backgroundColor: theme.text,
        marginVertical: 4,
        borderRadius: 4,
        padding: 5,
        flex: 0,
        // backgroundColor:'blue'
    },
    addButtonText: {
        color: theme.cardBg,
        fontSize: 18,
        fontWeight: '400',
        padding: 3,
        textAlign: 'center'
    },

})