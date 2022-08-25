import { LinearGradient } from 'expo-linear-gradient'
import React, { useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
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
          <Stack.Screen name='Main' component={MainScreen} />
          <Stack.Screen name='AssetTable' component={AssetTableScreen} />
          <Stack.Screen name='Input' component={InputScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Template>
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
  const { categoryName, items, color, icon, top3, largest, total } = route.params
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
    <>
      {/* HEADER */}
      <View style={[styles.header, { borderColor: showDivider ? '#333' : theme.bg }]}>
        <TouchableWithoutFeedback onPress={handlePopNav}>
          <View style={{position:'absolute',left:10,top: -5,zIndex:200}}>
            <Entypo name='chevron-left' size={32} color={color} style={{width:60}} />
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Entypo name={icon} size={25} color={color} style={{ width: 30 }} />
          <TextComp variant='h3'>{categoryName}</TextComp>
        </View>
      </View>
      {/* BODY */}
      <View style={{ paddingHorizontal: 16,paddingTop:15, flex: 1 }}>
        <FlatList
          initialNumToRender={15}
          onScroll={(x) => setShowDivider(x.nativeEvent.contentOffset.y < 3 ? false : true)}
          showsVerticalScrollIndicator={false}
          data={arr}
          renderItem={(item, index) => <AssetContainer item={item} accordionOpen={true} toggleInfo={() => { }} color={color} total={total} />}
          keyExtractor={(x) => x.id}
          ListHeaderComponent={<View style={{ marginBottom: 12 }}>
            <TextComp variant='h2' marginBottom weight='600'>Your stock portfolio is {Math.ceil(total * 100 / assetsTotal)}% of your total assets.</TextComp>
            <TextComp variant='body1' style={{ color: '#999' }}>Total portfolio value</TextComp>
            <TextComp variant='h1' weight='600'>${total.toLocaleString('en-US')}</TextComp>
          </View>}
          ListFooterComponent={<View style={{ minHeight: 150 }} />}

        />
      </View>
    </>
  )
}
// MAIN SCREEN ============================================
const MainScreen = ({ route, navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [inputEnabled, setInputEnabled] = useState(false)
  const [focusedAsset, setFocusedAsset] = useState({})

  const dispatch = useDispatch()
  const assets = useSelector(state => state.assets)

  const categoryCard = ({ item, index }) => {
    return <Item inputEnabled={inputEnabled} handleNavigate={handleNavigate} category={item} index={index} add={add} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setFocusedAsset={setFocusedAsset} />

  }
  const handleDelete = () => {
    setMenuOpen(false)
    dispatch(remove(focusedAsset))
  }

  const handleNavigate = (destination, item) => {
    navigation.navigate(destination, item)
  }
  return (
    <>
      {/* HEADER ======== */}
      < View style={styles.header
      }>
        <Text style={styles.title}>Assets</Text>
        <TouchableOpacity style={styles.addButton} onPress={(x) => setInputEnabled(!inputEnabled)}>
          {inputEnabled ?
            <Entypo name='cross' size={30} color={theme.red} style={{ width: 30, fontWeight: '600' }} /> :
            <Entypo name='plus' size={30} color={theme.text} style={{ width: 30, fontWeight: '600' }} />}
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
    paddingBottom: 10,
    borderBottomWidth: .4,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    alignContent: 'stretch'
  },
  title: {
    color: theme.text,
    fontSize: 29,
    fontWeight: "600",
    flex: 1
  },
  addButton: {
    flex: 0,
  },
  addButtonText: {
    color: theme.text,
    fontSize: 28,
    fontWeight: 'bold',
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
