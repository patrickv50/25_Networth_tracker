import { createSlice } from '@reduxjs/toolkit'

let initVal = [{
  categoryName: "Credit Card",
  items: [{
    name: "AMD",
    value: 96005
  }, {
    name: "APL",
    value: 40785
  },{
    name: "SPY",
    value: 23981
  },{
    name: "TSLA",
    value: 13981
  }]
},{
  categoryName:"Student Loans",
  items:[{
    name:"PC",
    value:1500
  },{
    name:"MacBook",
    value:650
  }
  ]
},{
  categoryName:"Car Loan",
  items:[{
    name:"GR86",
    value:20000
  }]
}]
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
      // console.log(index)
      state[index].items.push(action.payload)
    },
    remove: (state, action) => {
      state.filter(x => x !== action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = liabilitiesSlice.actions

export default liabilitiesSlice.reducer