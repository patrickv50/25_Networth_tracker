import React, { useMemo, useRef, useState } from 'react'
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import theme from '../../theme'
import { useDispatch } from 'react-redux'
import { Entypo, } from '@expo/vector-icons';
import axios from 'axios';

const CashInput = ({ add,cancel }) => {
    const [query, setQuery] = useState("")
    const [recs, setRec] = useState([])
    const [stock, setStock] = useState({
        symbol: "",
        name: "",
        price: 0
    })
    const [shares, setShares] = useState(0)
    const nameRef = useRef()
    let controller = useRef(new AbortController())
    const total = useMemo(() => {
        return stock.price * shares
    }, [stock, shares])
    const dispatch = useDispatch()

    const handleSubmit = () => {

        add({
            name: stock.symbol, value: total, category: 'Cash'
        })
    }
    const handleCancel = () => {
        cancel()
    }
    const handleShareChange = (x) => {
        if (!Number(x)) return
        let num = Number(x.toString().replace(',', ''))
        if (num > 2000000) return
        else setShares(num)
    }

    return (
        <KeyboardAvoidingView style={styles.form}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {/* HEADER =========*/}
            <View style={{ flexDirection: 'row', justifyContent: 'left', alignItems: 'center', marginBottom: 8, paddingTop: 40 }}>
                <Entypo name='bar-graph' size={20} color='rgb(145,250,147)' style={{ width: 25, marginBottom: 4, fontWeight: '600' }} />
                <Text style={{ fontSize: 18, color: theme.text, flex: 1 }}>Adding Cash</Text>
                <TouchableOpacity onPress={handleCancel}>
                    <Text style={{color:theme.text}}>Cancel</Text>
                </TouchableOpacity>
            </View>
            {/* BODY =========*/}
            <View style={{ marginTop: 20 }}>
                {!stock.price ?
                    <>
                        <Text style={{fontSize:26,color:theme.text,textAlign:'center',marginBottom:8}}>
                            Select Category
                        </Text>
                        {['Physical Cash','Checkings Acount','Savings Acount'].map((type,index)=>(
                            <TouchableOpacity key={index} style={{backgroundColor:theme.cardBg,padding:8,marginBottom:6,borderRadius:6}}>
                                <Text style={{fontSize:18,color:theme.text}}>{type}</Text>
                            </TouchableOpacity>
                        ))}

                    </>
                    :
                    <View>
                        {/* SYMBOL AND COMPANY NAME */}
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.symbol}>
                                {stock.symbol}
                            </Text>
                            <Text numberOfLines={1} style={styles.companyName}>
                                {stock.companyName}
                            </Text>
                        </View>
                        {/* SHARE COUNT INPUT =======*/}
                        <View style={styles.row}>
                            <Text style={styles.label}>Number of Shares</Text>
                            <TextInput selectionColor={'rgb(145,250,147)'} autoFocus={true} value={shares === 0 ? '' : shares.toString()} keyboardType='number-pad' returnKeyType='done' style={[styles.value, { flex: 1, textAlign: 'right' }]} onChangeText={(x) => handleShareChange(x)} />
                        </View>
                        {/* PRICE ====================*/}
                        <View style={styles.row}>
                            <Text style={styles.label}>Market Price</Text>
                            <Text style={styles.value}>${stock.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </View>
                        {/* TOTAL ====================*/}
                        <View style={styles.row}>
                            <Text style={styles.label}>Total</Text>
                            <Text style={styles.value}>${Math.floor(total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </View>
                        {/* BUTTONS ====================*/}
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                                <Text numberOfLines={2} style={styles.addButtonText}>Add {stock.symbol}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.addButton, { backgroundColor: 'transparent' }]} onPress={handleCancel}>
                                <Text style={[styles.addButtonText, { fontSize: 15, color: theme.text }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </KeyboardAvoidingView>
    )
}

export default CashInput

const styles = StyleSheet.create({
    form: {
        height: '100%',
        width: '100%',
        padding: 20,
        alignItems: 'stretch'
    },
    input: {
        width: '100%',
        fontSize: 18,
        padding: 16,
        backgroundColor: theme.input,
        color: '#ccc',
        marginVertical: 4,
        borderRadius: 6
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderColor: '#444'
    },
    label: {
        fontWeight: '200',
        flex: 1,
        color: theme.text,
        fontSize: 16
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.text,
    },
    price: {
        color: theme.text,
        fontSize: 25,
        fontWeight: 'normal',
        textAlign: 'center'
    },
    symbol: {
        color: theme.text,
        fontSize: 30,
        fontWeight: 'bold',
    },
    companyName: {
        fontSize: 16,
        color: '#777',
    },
    shares: {
        color: '#777',
        textAlign: 'right',
        fontSize: 14
    },
    container: {
        justifyContent: 'center',
        backgroundColor: '#282828a',
        padding: 20,
        borderRadius: 7,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    addButton: {
        textAlign: 'center',
        backgroundColor: 'rgb(145,250,147)',
        marginVertical: 4,
        borderRadius: 4,
        padding: 5,
        flex: 0,
        // backgroundColor:'blue'
    },
    addButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 3,
        textAlign: 'center'
    },

})