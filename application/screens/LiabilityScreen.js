import React from 'react'
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Item from '../components/Item'
import Template from '../components/Template'
import { add } from '../state/reducers/liabilitiesReducer'
import theme from '../theme'

const AssetScreen = () => {
  const liabilities = useSelector((state) => state.liabilities)
  const dispatch = useDispatch()
  return (
    <Template>
      <TouchableOpacity style={{ flexGrow: 0,padding:10}} onPress={() => dispatch(add({ name: "Hello", category: "categ", value: 142 }))} >
        <Text style={styles.title}>Liabilities</Text>
      </TouchableOpacity>
      <View style={{ flexGrow: 1,flex:1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={liabilities}
          renderItem={({ item, index }) => {
            return (
              <Item key={index} item={item} index={index} />
            )
          }}
          ListFooterComponent={<View style={{minHeight:100}}/>}
        >
        </FlatList>
      </View>
    </Template>
  )
}
const styles=StyleSheet.create({
  title:{
    color:theme.text,
    textAlign:'center',
    fontSize:25,
    fontWeight:"600"
  }
})
export default AssetScreen