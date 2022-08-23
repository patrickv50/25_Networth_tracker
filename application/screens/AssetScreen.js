import { LinearGradient } from 'expo-linear-gradient'
import React, { useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import InputSwitch from '../components/InputSwitch'
import Item from '../components/Item'
import Template from '../components/Template'
import { add, addInit, remove } from '../state/reducers/assetsReducer'
import theme from '../theme'
import { Entypo, } from '@expo/vector-icons';
import Menu from '../components/Menu'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssetContainer from '../components/AssetContainer'
import TextComp from '../components/shared/TextComp'
const Stack = createNativeStackNavigator();

const categories = [{
  name: 'Cash',
  icon: 'wallet',
  color: 'rgb(252,199,92)'
}, {
  name: 'Stocks',
  icon: 'bar-graph',
  color: 'rgb(145,250,147)'
}, {
  name: 'Real Estate',
  icon: 'home',
  color: 'rgb(132,211,219)'
}, {
  name: 'Tangible',
  icon: 'laptop',
  color: 'rgb(207,140,120)'
}, {
  name: 'Intangible',
  icon: 'book',
  color: 'rgb(239,176,129)'
}, {
  name: 'Misc',
  icon: 'box',
  color: 'white'
},]

const AssetScreen = () => {
  return (
    <Template>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.bg, },
        }}>
          <Stack.Screen name='Main' component={SummaryScreen} />
          <Stack.Screen name='AssetTable' component={AssetTableScreen} />
          <Stack.Screen name='Input' component={InputScreen} />
          <Stack.Screen name='Selection' component={SelectScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Template>
  )
}
// SELECT SCREEN
const SelectScreen = ({ navigation, route }) => {
  return (
    <View style={styles.modal}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Category</Text>
      </View>
      <View style={styles.catListContainer}>
        {categories.map((catg, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('Input', { category: catg })} style={[styles.categoryCard, { borderColor: '#777' }]}>
            <>
              <Entypo name={catg.icon} size={37} color={catg.color} style={{ width: 37, marginBottom: 4, fontWeight: '600' }} />
              <Text style={styles.categoryCardText}>{catg.name}</Text>
            </>
          </TouchableOpacity>
        )
        )
        }
      </View>
      <TouchableOpacity onPress={() => navigation.popToTop()}>
        <Text style={{ color: '#999', marginTop: 18, fontSize: 18, padding: 4 }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
}
// INPUT SCREEN
const InputScreen = ({ navigation, route }) => {
  const { category } = route.params
  const handlePopNav = () => {
    navigation.popToTop()
  }
  return <InputSwitch category={category} add={add} goBack={handlePopNav} />
}
// ASSET TABLE SCREEN
const AssetTableScreen = ({ navigation, route }) => {
  const { item } = route.params
  const { categoryName, items, top3, largest, total } = item
  const [showDivider, setShowDivider] = useState(false)
  const assets = useSelector(state => state.assets)

  const assetsTotal = useMemo(() => {
    return assets.reduce((total, curr) => total += curr.total, 9)
  })
  const arr = useMemo(() => {
    const ar = top3.concat(items).sort((a, b) => b.value - a.value)
    return ar
  }, [top3, items])

  const handlePopNav = () => {
    navigation.popToTop()
  }
  return (
    <Template>
      {/* HEADER */}
      <View style={[styles.header, { borderColor: showDivider ? '#333' : theme.bg }]}>
        <TouchableOpacity style={{ position: 'absolute', top: 40, left: -14, paddingVertical:20,paddingLeft:20,paddingRight:200}} onPress={handlePopNav}>
          <Entypo name='chevron-left' size={30} color={item.color} style={{ width: 30}} />
        </TouchableOpacity>
        <View style={{ flex: 1,flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
          <Entypo name={item.icon} size={25} color={item.color} style={{ width: 30 }} />
          <TextComp variant='h3'>{categoryName}</TextComp>
        </View>
      </View>
      {/* BODY */}
      <View style={{ paddingHorizontal: 16, flex: 1 }}>

        <FlatList
          initialNumToRender={15}
          onScroll={(x) => setShowDivider(x.nativeEvent.contentOffset.y < 3 ? false : true)}
          showsVerticalScrollIndicator={false}
          data={arr}
          renderItem={(item, index) => <AssetContainer item={item} accordionOpen={true} toggleInfo={() => { }} total={total} />}
          keyExtractor={(x) => x.id}
          ListHeaderComponent={<View style={{ marginBottom: 12 }}>
            <TextComp variant='h2' marginBottom weight='600'>Your stock portfolio is {Math.ceil(total * 100 / assetsTotal)}% of your total assets.</TextComp>
            <TextComp variant='body1' style={{ color: '#999' }}>Total portfolio value</TextComp>
            <TextComp variant='h1' weight='600'>${total.toLocaleString('en-US')}</TextComp>
          </View>}
          ListFooterComponent={<View style={{ minHeight: 150 }} />}

        />
      </View>
    </Template>
  )
}
// MAIN SCREEN
const SummaryScreen = ({ route, navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [focusedAsset, setFocusedAsset] = useState({})

  const dispatch = useDispatch()
  const assets = useSelector(state => state.assets)

  const categoryCard = ({ item, index }) => {
    return <Item navigateToTable={navigateToTable} total={assets[index].total} item={item} index={index} add={add} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setFocusedAsset={setFocusedAsset} />
      
  }
  const handleDelete = () => {
    setMenuOpen(false)
    dispatch(remove(focusedAsset))
  }
  const navigateToTable = (item, cat) => {
    navigation.navigate('AssetTable', { item })
  }
  return (
    <>
      {/* HEADER ======== */}
      < View style={styles.header
      }>
        <Text style={styles.title}>Assets</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Selection')}>
          <Entypo name='plus' size={30} color={theme.text} style={{ width: 30, fontWeight: '600' }} />
        </TouchableOpacity>
        {/* DEBUG ACTIONS ========== */}
        {/* <TouchableOpacity style={styles.addButton} onPress={() => dispatch(addInit(null))}>
          <Text style={styles.addButtonText}>A</Text>
        </TouchableOpacity> */}
        {/* DEBUG ACTIONS ========== */}
        <LinearGradient
          colors={['rgba(0,0,0,.33)', 'transparent']}
          style={{
            height: 25,
            width: '120%',
            position: 'absolute',
            bottom: -25,
            left: 0
          }}
          start={{ x: .5, y: 0 }}
          end={{ x: .5, y: 1 }}
        />
      </View >
      {/* BODY ========*/}
      < View style={{ flexGrow: 1, flex: 1, paddingHorizontal: 16 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={assets}
          renderItem={categoryCard}
          keyExtractor={(item) => item.categoryName}
          ListFooterComponent={<View style={{ minHeight: 100 }} />}
          ListHeaderComponent={<View style={{ minHeight: 20 }} />}
        >
        </FlatList>
      </View >
      {/* MENU ========*/}
      < Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} remove={handleDelete} />
    </>
  )
}
const styles = StyleSheet.create({
  header: {
    flexGrow: 0,
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: .4,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    // backgroundColor:'red',
    alignContent: 'stretch'
  },
  title: {
    color: theme.text,
    fontSize: 29,
    fontWeight: "600",
    flex: 1
  },
  addButton: {
    // padding: 12,
    flex: 0,
  },
  addButtonText: {
    color: theme.text,
    fontSize: 28,
    fontWeight: 'bold',
    // padding: 3
  },
  modal: {
    backgroundColor: theme.bg,
    height: '100%'
  },
  catListContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    paddingHorizontal: 8
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
