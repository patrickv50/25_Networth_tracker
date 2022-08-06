import { createSlice } from '@reduxjs/toolkit'

let initVal=[{
    name:"Asset1",
    category:"Misc",
    value:2981
}]
export const assetsSlice = createSlice({
  name: 'assets',
  initialState: initVal,
  reducers: {
    add: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(state)
      state.push(action.payload)
    },
    remove: (state,action) => {
      state.filter(x=>x!==action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { add,remove } = assetsSlice.actions

export default assetsSlice.reducer