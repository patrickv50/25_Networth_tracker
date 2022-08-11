import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Input from '../components/Input'
import Item from '../components/Item'
import Template from '../components/Template'
import { add, addInit } from '../state/reducers/assetsReducer'
import theme from '../theme'

const categories = ['Cash', 'Stocks', 'Tangible', 'Intangible', 'Real estate','Misc']

const AssetScreen = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [category, setCategory] = useState("")
  const [inputOpen, setInputOpen] = useState(false)

  const dispatch = useDispatch()
  const assets = useSelector((state) => state.assets)

  const getData = async () => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem('@assets'))
      if (data) {
        dispatch(addInit(data))
      } else {
        console.log("NO DATA")
      }
    } catch (e) {
      // error reading value
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <Template>
      {/* HEADE#R */}
      <View style={{ flexGrow: 0, paddingHorizontal: 25, flexDirection: 'row', position: 'relative', zIndex: 100, alignItems: 'center' }}>
        <Text style={styles.title}>Assets</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalOpen(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => dispatch(addInit(null))}>
          <Text style={styles.addButtonText}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => dispatch(addInit(sampleData))}>
          <Text style={styles.addButtonText}>A</Text>
        </TouchableOpacity>
        <LinearGradient
          colors={['rgba(0,0,0,.33)', 'transparent']}
          style={{
            height: 25,
            width: '120%',
            position: 'absolute',
            bottom: -25,
            left: 0
          }}
          start={{ x: '50%', y: '0px' }}
          end={{ x: '50%', y: '25px' }}
        />
      </View>
      {/* BODY */}
      <View style={{ flexGrow: 1, flex: 1, paddingHorizontal: 16 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={assets}
          renderItem={({ item, index }) => {
            return (
              <Item key={index} item={item} index={index} add={add} />
            )
          }}
          ListFooterComponent={<View style={{ minHeight: 100 }} />}
          ListHeaderComponent={<View style={{ minHeight: 20 }} />}
        >
        </FlatList>
      </View>
      {/* MODAL */}
      <Modal transparent={true} animationType='fade' visible={modalOpen}>
        <View style={styles.modal}>
          {inputOpen ?
            <Input category={category} setInputOpen={setInputOpen} setModalOpen={setModalOpen} add={add} />
            :
            <>
              <Text style={{ color: theme.text, fontSize: 22, marginBottom: 10 }}>Select Category</Text>
              <View style={styles.catListContainer}>
                {categories.map((catg, index) => (
                  <TouchableOpacity key={index} style={[styles.categoryCard, { borderColor: category === catg ? 'green' : '#000' }]} onPress={() => setCategory(catg)}>
                    <Text style={styles.categoryCardText}>{catg}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={{ backgroundColor: '#ccc', padding: 8, borderRadius: 4, marginVertical: 8, alignItems: 'center', width: '40%' }} onPress={() => setInputOpen(true)}>
                <Text>Next</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Text style={{ color: '#999', marginVertical: 8, padding: 4 }}>Cancel</Text>
              </TouchableOpacity>
            </>
          }
        </View>
      </Modal>
    </Template>
  )
}
const styles = StyleSheet.create({
  title: {
    color: theme.text,
    fontSize: 29,
    fontWeight: "600",
    flex: 1
  },
  addButton: {
    padding: 12,
    flex: 0,
  },
  addButtonText: {
    color: theme.text,
    fontSize: 28,
    fontWeight: 'bold',
    padding: 3
  },
  modal: {
    zIndex: 200,
    backgroundColor: theme.bg,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  catListContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap'
  },
  categoryCard: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    height: 100,
    flexGrow: 1,
    flexBasis: 100,
    margin: 5,
    backgroundColor: theme.cardBg
  },
  categoryCardText: {
    color: theme.text
  }
})
export default AssetScreen

let sampleData = [{
  categoryName: "Cash",
  items: [{
    name: "Chase",
    value: 12305
  },{
    name: "Wells Fargo",
    value: 3600
  }]
}, {
  categoryName: "Stocks",
  items: [{
    name: "AMD",
    value: 87600
  },{
    name: "APL",
    value: 6300
  }]
}, {
  categoryName: "Real Estate",
  items: [{
    name: "Desk",
    value: 3
  }]
}, {
  categoryName: "Tangible",
  items: [{
    name: "Electronics",
    value: 12305
  },{
    name: "RAV4",
    value: 15000
  }]
}, {
  categoryName: "Intangible",
  items: [{
    name: "Bachelor's",
    value: 10
  }]
}, {
  categoryName: "Misc",
  items: [{
    name: "Others",
    value: 5000
  }]
}
]