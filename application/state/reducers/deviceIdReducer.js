import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid';


const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@deviceId', JSON.stringify(value))
    } catch (e) {
        // saving error
        console.log("ERROR STORING")
    }
}

export const deviceIdSlice = createSlice({
    name: 'deviceId',
    initialState: null,
    reducers: {
        setId: (state, action) => {
            storeData(action.payload)
            return action.payload
        },
        create: (state, action) => {
            console.log("CREATING DEVICE ID")
            let id = uuid()
            storeData(id)
            return id
        },
        remove: (state, action) => {
            storeData(null)
            return null
        }
    },
})


// Action creators are generated for each case reducer function
export const { create, remove, setId } = deviceIdSlice.actions

export default deviceIdSlice.reducer



