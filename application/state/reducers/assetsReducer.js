import { createSlice } from '@reduxjs/toolkit'

let initVal = [{
  categoryName: "Stocks",
  items: [{
    name: "AMD",
    value: 96005
  }, {
    name: "APL",
    value: 40785
  },{
    name: "APL",
    value: 23981
  },{
    name: "APL",
    value: 13981
  }]
},{
  categoryName:"Tangible",
  items:[{
    name:"PC",
    value:1500
  },{
    name:"MacBook",
    value:650
  }
  ]
},{
  categoryName:"Misc",
  items:[]
},{
  categoryName:"Cash",
  items:[]
}]
export const assetsSlice = createSlice({
  name: 'assets',
  initialState: initVal,
  reducers: {
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action.payload)
      let index=state.findIndex((elem)=>elem.categoryName===action.payload.category)
      // console.log(index)
      state[index].items.push(action.payload)
    },
    remove: (state, action) => {
      state.filter(x => x !== action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = assetsSlice.actions

export default assetsSlice.reducer