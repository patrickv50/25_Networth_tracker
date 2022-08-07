import { configureStore } from '@reduxjs/toolkit'
import assetsReducer from './reducers/assetsReducer'
import liabilitiesReducer from './reducers/liabilitiesReducer'

const store = configureStore({
  reducer: {
    assets:assetsReducer,
    liabilities:liabilitiesReducer
  },
})

export default store