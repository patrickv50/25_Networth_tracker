import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import theme from '../theme'
import { useDispatch } from 'react-redux'
import { Entypo, } from '@expo/vector-icons';
import StockInput from './input-screens/StockInput';
import CashInput from './input-screens/CashInput';
import BaseInput from './input-screens/BaseInput';

const InputSwitch = ({ category, add, goBack }) => {
  

    const dispatch = useDispatch()

    const handleSubmit = (newObj) => {
        if (!Number(newObj.value)) return
        let val = Math.floor(Number(newObj.value))
        dispatch(add({
            name: newObj.name,
            value: val,
            category: newObj.category,
            // shares:newObj.shares||null
            ...newObj.shares&&{shares:newObj.shares},
            ...newObj.deprecRate&&{deprecRate:Number(newObj.deprecRate)}

        }))
        goBack()
    }
    const handleCancel = () => {
        goBack()
    }

    if (category.categoryName === 'Stocks') return <StockInput add={handleSubmit} cancel={handleCancel} />
    else if (category.categoryName === 'Cash') return <CashInput add={handleSubmit} cancel={handleCancel} />
    else return (
       <BaseInput handleSubmit={handleSubmit} cancel={handleCancel} category={category}/>
    )
}

export default InputSwitch
