import { configureStore } from '@reduxjs/toolkit'
import assetsReducer from './reducers/assetsReducer'
import deviceIdReducer from './reducers/deviceIdReducer'
import liabilitiesReducer from './reducers/liabilitiesReducer'

const store = configureStore({
  reducer: {
    assets:assetsReducer,
    liabilities:liabilitiesReducer,
    deviceId:deviceIdReducer
  },
})

export default store