import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

let initVal = [{
  categoryName: "Credit Card",
  items: []
},{
  categoryName:"Student Loans",
  items:[]
},{
  categoryName:"Car Loan",
  items:[]
}]

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@liabilities', JSON.stringify(value))
  } catch (e) {
    // saving error
    console.log("ERROR")
  }
}

export const liabilitiesSlice = createSlice({
  name: 'liabilites',
  initialState: initVal,
  reducers: {
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      let index = state.findIndex((elem) => elem.categoryName === action.payload.category)
      if (index === -1) {
        return [...state, { categoryName: action.payload.category, items: [{ name: action.payload.name, value: action.payload.value }] }]
      }
      state[index].items.push(action.payload)
      storeData(state)
    },
    addInit: (state, action) => {
      storeData(action.payload || init)
      return action.payload || init
    },
    remove: (state, action) => {
      state.filter(x => x !== action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove,addInit } = liabilitiesSlice.actions

export default liabilitiesSlice.reducer