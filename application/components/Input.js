import React, { useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { add } from '../state/reducers/assetsReducer'
import theme from '../theme'
import { useDispatch } from 'react-redux'
const Input = ({category,setInputOpen,setModalOpen}) => {
    const [name, setName] = useState("")
    const [value, setValue] = useState(0)
    const nameRef = useRef()
    const valueRef = useRef()

    const dispatch=useDispatch()

    const handleSubmit=()=>{
        setInputOpen(false)
        setModalOpen(false)
        dispatch(add({
            name,value,category
        }))
    }
  return (
    <View style={styles.form}>
        <TextInput editable={false} selectTextOnFocus={false} style={styles.input} value={category}/>
        <TextInput placeholderTextColor="#999" style={styles.input} value={name} ref={nameRef} onChangeText={(x) => setName(x)} onSubmitEditing={() => valueRef.current.focus()} placeholder="Name" />
            <TextInput placeholderTextColor="#999" returnKeyType="done" keyboardType="number-pad" ref={valueRef} onSubmitEditing={handleSubmit} style={styles.input} value={value ? String(value) : ''} onChangeText={x => {
                if (!x.length) setValue(0)
                if (Number(x)) setValue(Number(x))
            }
            } placeholder="Value" />
        <TouchableOpacity onPress={handleSubmit}>
            <Text>Add</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    form:{
        width:'100%',
        padding:10
    },
    input: {
        fontSize: 18,
        padding: 8,
        backgroundColor: theme.input,
        color: '#ccc',
        marginVertical: 2,
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

})