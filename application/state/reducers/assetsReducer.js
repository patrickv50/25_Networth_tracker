import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid';

let init = [{
  categoryName: "Cash",
  icon: 'wallet',
  color: 'rgb(252,199,92)',
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Stocks",
  icon: 'bar-graph',
  color: 'rgb(145,250,147)',
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Real Estate",
  icon: 'home',
  color: 'rgb(132,211,219)',
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Tangible",
  icon: 'laptop',
  color: 'rgb(207,140,120)',
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Intangible",
  icon: 'book',
  color: 'rgb(239,176,129)',
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Misc",
  icon: 'box',
  color: 'white',
  total: 0,
  top3: [],
  items: [],
  largest: null
}
]
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@assets', JSON.stringify(value))
  } catch (e) {
    // saving error
    console.log("ERROR STORING")
  }
}



export const assetsSlice = createSlice({
  name: 'assets',
  initialState: init,
  reducers: {
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      action.payload.id = uuid()
      // Check if category exist
      let index = state.findIndex((elem) => elem.categoryName === action.payload.category)
      // If not then create a new one
      if (index === -1) {
        return [...state, { categoryName: action.payload.category, items: { name: action.payload.name, value: action.payload.value } }]
      }
      // Else push payload
      if (state[index].top3.length < 3) {
        state[index].top3.push(action.payload)
        state[index].top3.sort((a, b) => b.value - a.value)
      }
      else {
        if (state[index].top3[2].value < action.payload.value) {
          state[index].items.push(state[index].top3[2])
          state[index].top3[2] = action.payload
          state[index].top3.sort((a, b) => b.value - a.value)
        }
        else {
          state[index].items.push(action.payload)
        }
      }
      // Add value to total
      state[index].total += action.payload.value
      // Compare Payload to largest asset
      if (!state[index].largest) state[index].largest = action.payload
      else {
        if (state[index].largest.value < action.payload.value) state[index].largest = action.payload
      }
      storeData(state)
    },
    remove: (state, action) => {
      const { category, value, id } = action.payload
      let index = state.findIndex((elem) => elem.categoryName === category)
      // CHECK IF IN TOP 3 THEN REMOVE
      if (state[index].top3.find(elem => elem.id === id)) {
        state[index].top3 = state[index].top3.filter(x => x.id !== id)
        if (state[index].items.length > 0) {
          let max = { value: 0 }
          state[index].items.map((item, idx) => {
            if (item.value > max.value) {
              max = item
            }
          })
          state[index].top3[2] = max
          state[index].items = state[index].items.filter(x => x.id !== max.id)
        }
      }
      // ELSE REMOVE IN ITEMS
      else {
        state[index].items = state[index].items.filter(x => x.id !== id)
      }
      state[index].total -= value
      storeData(state)


    },
    addInit: (state, action) => {
      storeData(action.payload || init)
      return action.payload || init
    },

  },
})


// Action creators are generated for each case reducer function
export const { add, remove, addInit } = assetsSlice.actions

export default assetsSlice.reducer



