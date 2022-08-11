import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, TouchableWithoutFeedback, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Input from '../components/Input'
import Item from '../components/Item'
import Template from '../components/Template'
import { add, addInit } from '../state/reducers/assetsReducer'
import theme from '../theme'
import { Entypo, AntDesign } from '@expo/vector-icons';

const categories = ['Cash', 'Stocks', 'Real Estate', 'Tangible', 'Intangible', 'Misc']
const icons = [{
  name: 'wallet',
  color: 'rgb(252,199,92)'
}, {
  name: 'bar-graph',
  color: 'rgb(145,250,147)'
}, {
  name: 'home',
  color: 'rgb(132,211,219)'
}, {
  name: 'laptop',
  color: 'rgb(207,140,120)'
}, {
  name: 'book',
  color: 'rgb(239,176,129)'
}, {
  name: 'box',
  color: 'white'
},]
const AssetScreen = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [category, setCategory] = useState("")
  const [inputOpen, setInputOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(true)

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
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ display: modalOpen ? 'none' : 'flex', }}>
        <Item item={item} index={index} add={add} icon={icons[index]} modalOpen={modalOpen} setMenuOpen={setMenuOpen} />
      </View>
    )
  }
  const handleEdit = () => {

  }
  const handleDelete = () => {

  }
  const toggleMenu = () => {

  }

  return (
    <Template>
      {/* HEADER ======== */}
      <View style={{ flexGrow: 0, paddingHorizontal: 25, flexDirection: 'row', position: 'relative', zIndex: 100, alignItems: 'center' }}>
        <Text style={styles.title}>Assets</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalOpen(true)}>
          <Entypo name='plus' size={30} color={theme.text} style={{ width: 30, fontWeight: '600' }} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.addButton} onPress={() => dispatch(addInit(null))}>
          <Text style={styles.addButtonText}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => dispatch(addInit(sampleData))}>
          <Text style={styles.addButtonText}>A</Text>
        </TouchableOpacity> */}
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
      {/* BODY ========*/}
      <View style={{ flexGrow: 1, flex: 1, paddingHorizontal: 16 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={assets}
          renderItem={renderItem}
          keyExtractor={(item) => item.categoryName}
          ListFooterComponent={<View style={{ minHeight: 100 }} />}
          ListHeaderComponent={<View style={{ minHeight: 20 }} />}
        >
        </FlatList>
      </View>
      {/* MODAL ========*/}
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <View style={styles.modal}>
          {inputOpen ?
            <Input category={category} setInputOpen={setInputOpen} setModalOpen={setModalOpen} add={add} />
            :
            <>
              <Text style={{ color: theme.text, fontSize: 22, marginBottom: 10 }}>Select Category</Text>
              <View style={styles.catListContainer}>
                {categories.map((catg, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => setCategory(catg)}>
                    <View key={index} style={[styles.categoryCard, { borderColor: category === catg ? icons[index].color : '#333' }]} onPress={() => setCategory(catg)}>
                      <Entypo name={icons[index].name} size={37} color={icons[index].color} style={{ width: 37, marginBottom: 4, fontWeight: '600' }} />
                      <Text style={styles.categoryCardText}>{catg}</Text>
                    </View>
                  </TouchableWithoutFeedback>
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
      {/* MENU ========*/}
      <View style={{ display: menuOpen ? 'flex' : 'none', position: 'absolute', backgroundColor: 'white', padding: 12,width:150, top: 150, right: 0, borderTopLeftRadius: 18, borderBottomLeftRadius: 18, zIndex: 299, }}>
        <TouchableOpacity>
          <View style={{ padding: 6, marginVertical: 4,flexDirection:'row',backgroundColor:'orange',borderRadius:7 }}>
            <Entypo name="edit" size={18} color='#111' style={{  marginRight: 4, fontWeight: '600' }} />
            <Text style={{fontSize:16}}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ padding: 6, marginVertical: 4,flexDirection:'row',backgroundColor:'orange',borderRadius:7 }}>
            <Entypo name="trash" size={18} color='#111' style={{  marginRight: 4, fontWeight: '600' }} />
            <Text style={{fontSize:16}}>Delete</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMenuOpen(false)}>
        <View style={{ padding: 6, marginVertical: 4,flexDirection:'row',backgroundColor:'orange',borderRadius:7 }}>
            <AntDesign name="close" size={18} color='#111' style={{  marginRight: 4, fontWeight: '600' }} />
            <Text style={{fontSize:16}}>Close</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    // backgroundColor: theme.bg,
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
    alignItems: 'center',
    justifyContent: 'center'
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
  }, {
    name: "Wells Fargo",
    value: 3600
  }]
}, {
  categoryName: "Stocks",
  items: [{
    name: "AMD",
    value: 87600
  }, {
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
  }, {
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