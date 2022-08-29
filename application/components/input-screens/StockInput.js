import React, { useContext, useMemo, useRef, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Entypo, } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect } from 'react';
import { ThemeContext } from '../../ThemeContext';

const StockInput = ({ add, cancel }) => {
    const curTheme = useContext(ThemeContext)
    const styles = useMemo(() => {
        return getTheme(curTheme)
    }, [curTheme])

    const [query, setQuery] = useState("")
    const [recs, setRec] = useState([])
    const [stock, setStock] = useState({
        symbol: "",
        name: "",
        price: 0
    })
    const [shares, setShares] = useState(0)
    const nameRef = useRef()
    const total = useMemo(() => {
        return stock.price * shares
    }, [stock, shares])

    let controller = useRef(new AbortController())
    const fetchData = async (query) => {
        try {
            controller.current.abort()
            controller.current = new AbortController()
            await axios.get('https://networthtrkr.herokuapp.com/search/' + query, {
                signal: controller.current.signal
            })
                .then(res => {
                    setRec(res.data.slice(0, 4))
                })
        } catch (e) { }
    }
    const fetchPrice = async ({ symbol, companyName }) => {
        setRec([])
        await axios.get('https://networthtrkr.herokuapp.com/quote/' + symbol).then(res => {
            setStock({
                symbol: symbol,
                companyName: companyName,
                price: res.data.current
            })
        }).catch(e => console.error(e))
    }
    const handleChange = (x) => {
        setQuery(x)
        if (x.length <= 1) {
            setRec([])
        }
        else {
            fetchData(x)
        }
    }
    const handleSubmit = () => {
        add({
            name: stock.symbol,
            value: total,
            category: 'Stocks',
            shares: Number(shares)
        })
    }
    const handleShareChange = (x) => {
        if (!Number(x)) return
        let num = Number(x.toString().replace(',', ''))
        if (num > 2000000) return
        else setShares(num)
    }
    useEffect(() => {
        nameRef.current.focus()
    }, [])

    return (
        <KeyboardAvoidingView style={styles.form}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {/* HEADER =========*/}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Entypo name='bar-graph' size={20} color='rgb(145,250,147)' style={{ width: 25, fontWeight: '600' }} />
                <Text style={{ fontSize: 22, color: curTheme.text, flex: 1 }}>Adding Stocks</Text>
                <TouchableOpacity onPress={cancel}>
                    <Text style={{ color: curTheme.text }}>Cancel</Text>
                </TouchableOpacity>
            </View>
            {/* BODY =========*/}
            <View>
                {!stock.price ?
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            // autoFocus={true}
                            placeholder="Enter company name or ticker symbol"
                            placeholderTextColor="#999"
                            style={styles.input}
                            value={query}
                            ref={nameRef}
                            onChangeText={handleChange}
                        />
                        {/* AUTOMCOMPLETE RECOMMEDATIONS */}
                        {recs.length > 0 &&
                            <View style={{ position: 'absolute', top: '100%', width: '100%', backgroundColor: curTheme.cardBg, paddingHorizontal: 10 }}>
                                {recs.map((rec, index) => (
                                    <TouchableOpacity onPress={() => fetchPrice(rec)} key={index} style={{ borderBottomColor: '#1b1b1b', paddingVertical: 10, borderBottomWidth: .5, marginVertical: 5 }}>
                                        <Text style={{ color: curTheme.text, fontSize: 16, fontWeight: 'bold' }}>{rec.symbol}</Text>
                                        <Text numberOfLines={1} style={{ color: '#666', fontSize: 14 }}>{rec.companyName}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>}

                    </View>
                    :
                    <View>
                        {/* SYMBOL AND COMPANY NAME */}
                        <View style={{ marginTop: 30 }}>
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
                            <Text style={styles.value}>${stock.price.toFixed(2)}</Text>
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
                            <TouchableOpacity style={[styles.addButton, { backgroundColor: 'transparent' }]} onPress={cancel}>
                                <Text style={[styles.addButtonText, { fontSize: 15, color: curTheme.text }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </KeyboardAvoidingView>
    )
}

export default StockInput

const getTheme = (theme) => StyleSheet.create({
    form: {
        paddingHorizontal: 20,
        paddingTop: theme.statusBar,
        height: '100%',
        width: '100%',
        alignItems: 'stretch'
    },
    input: {
        width: '100%',
        fontSize: 18,
        padding: 16,
        backgroundColor: theme.input,
        color: theme.text,
        marginVertical: 4,
        borderRadius: 6
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 18,
        borderBottomWidth: .7,
        borderColor: '#444'
    },
    label: {
        fontWeight: '300',
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
    },
    addButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 3,
        textAlign: 'center'
    },

})