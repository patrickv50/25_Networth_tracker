import React from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Template from '../components/Template'
import { add } from '../state/reducers/assetsReducer'

const AssetScreen = () => {
  const assets = useSelector((state)=>state.assets)
  const dispatch = useDispatch()
  console.log(assets)
  return (
    <Template>
      {assets.map(asset=>(
        <View>
          <Text>{asset.name}</Text>
        </View>
      ))}
      <TouchableOpacity style={{marginTop:60}} onPress={()=>dispatch(add({name:"Hello",category:"categ",value:142}))} >
        <Text>ADD ASSET</Text>
        </TouchableOpacity>
    </Template>
  )
}

export default AssetScreen