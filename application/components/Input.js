import { useEffect, useRef, useState } from "react"
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native"
import theme from "../theme"

const Input = ({addEntity, setAssets, setLiabilities, assetWindowOpen, setModalOpen }) => {
    const [name, setName] = useState("")
    const [value, setValue] = useState(0)
    const [category, setCategory] = useState("")
    const categoryRef = useRef()
    const nameRef = useRef()
    const valueRef = useRef()
    const handleSubmit = () => {
        setName("")
        setValue(0)
        nameRef.current.focus()
        addEntity({ name: name, value: value }, assetWindowOpen ? setAssets : setLiabilities)
        setModalOpen(false)
    }
    useEffect(()=>{
        nameRef.current.focus()
    },[])
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}
            style={styles.container}
            >
            <TextInput placeholderTextColor="#999" style={styles.input} value={name} ref={nameRef} onChangeText={(x) => setName(x)} onSubmitEditing={() => categoryRef.current.focus()} placeholder="Name" />
            <TextInput placeholderTextColor="#999" style={styles.input} value={category} ref={categoryRef} onChangeText={(x) => setCategory(x)} onSubmitEditing={() => valueRef.current.focus()} placeholder="Category" />
            <TextInput placeholderTextColor="#999" returnKeyType="done" keyboardType="number-pad" ref={valueRef} onSubmitEditing={handleSubmit} style={styles.input} value={value ? String(value) : ''} onChangeText={x => {
                if (!x.length) setValue(0)
                if (Number(x)) setValue(Number(x))
            }
            } placeholder="Value" />
            <Button style={styles.input} onPress={handleSubmit} title={assetWindowOpen ? 'Add asset' : 'Add Liability'} />
            {/* <Button style={styles.input} onPress={handleSubmit} title={assetWindowOpen ? 'Add asset' : 'Add Liability'} /> */}
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
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
export default Input