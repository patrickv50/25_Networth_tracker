import React, { useCallback, useEffect, useMemo, useRef, useState, createContext, useContext } from 'react';
import { Animated, Easing, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Template from '../components/Template';
import { addInit } from '../state/reducers/assetsReducer';
import { addInit as addInitLia } from '../state/reducers/liabilitiesReducer';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TextComp from '../components/shared/TextComp';
import { ThemeContext } from '../ThemeContext';
const Stack = createNativeStackNavigator();

export default function HomeScreen({ navigation, route }) {
  const curTheme = useContext(ThemeContext)
  const { changeTheme } = route.params
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: curTheme.bg, },
      }}>
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name='Setting' component={SettingScreen} initialParams={{ changeTheme: changeTheme }} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}
// SETTINGS SCREEN DIVIDER ======================
const SettingScreen = ({ navigation, route }) => {
  const { changeTheme } = route.params
  const curTheme = useContext(ThemeContext)
  const styles = useMemo(() => {
    return getTheme(curTheme)
  }, [curTheme])
  const [isLight, setIsLight] = useState(false)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const userNameRef = useRef()

  const handlePress = () => {
    setIsLight(state=>{
      if (state) changeTheme('dark')
      else changeTheme('light')
      return !state
    })
  }
  const handleLogin =() =>{

  }
  return (
    <View style={{ flex: 1, paddingHorizontal: 12, paddingTop: curTheme.statusBar, backgroundColor: curTheme.bg }}>
      <TextComp variant='h2' style={{color:curTheme.text}}>Settings</TextComp>
      <TouchableOpacity onPress={handlePress} style={styles.themeButton}>
        <TextComp>CHANGE THEME</TextComp>
      </TouchableOpacity>
      <View>
        <TextInput
          // autoFocus={true}
          placeholder="Username"
          placeholderTextColor={curTheme.textSecondary}
          style={styles.input}
          value={userName}
          ref={userNameRef}
          onChangeText={(x) => setUserName(x)}
        />
        <TextInput
          // autoFocus={true}
          textContentType='password'
          placeholder="Password"
          placeholderTextColor={curTheme.textSecondary}
          style={styles.input}
          value={password}
          // ref={userNameRef}
          onChangeText={(x) => setPassword(x)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleLogin}>
          <Text numberOfLines={2} style={styles.addButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// MAIN SCREEN DIVIDER ======================
const MainScreen = ({ navigation }) => {
  const assets = useSelector((state) => state.assets)
  const liabilities = useSelector((state) => state.liabilities)
  const [dims, setDims] = useState({});
  const [netWorth, setNetWorth] = useState()
  const dispatch = useDispatch()
  const curTheme = useContext(ThemeContext)

  const styles = useMemo(() => {
    return getTheme(curTheme)
  }, [curTheme])
  const widthAnim = useRef(new Animated.Value(0)).current;

  const totAssets = useMemo(() => {
    if (!assets[0].top3) return 1
    return assets.reduce((a, b) => {
      return a + (b.items.reduce((a, b) => a + b.value, 0) + b.top3.reduce((a, b) => a + b.value, 0))
    }, 0) || 0
  }, [assets])

  const totLiabilites = useMemo(() => {
    if (!liabilities[0].top3) return 1
    return liabilities.reduce((a, b) => {
      return a + (b.items.reduce((a, b) => a + b.value, 0) + b.top3.reduce((a, b) => a + b.value, 0))
    }, 0) || 0
  }, [liabilities])

  const animate = useCallback((num, num2) => {
    if (dims.width) Animated.timing(widthAnim, {
      toValue: dims.width && num ? (dims.width * (num / (num + num2))) : 0,
      duration: 2000,
      useNativeDriver: false,
      delay: 100,
      easing: Easing.easing
    }).start()
  }, [dims])
  const getData = async () => {
    try {
      // dispatch(addInit(false))
      // dispatch(addInitLia(false))
      const data = JSON.parse(await AsyncStorage.getItem('@assets'))
      const data2 = JSON.parse(await AsyncStorage.getItem('@liabilities'))

      if (data && data[0].top3) {
        console.log("YES DATA")
        dispatch(addInit(data))
      } else {
        dispatch(addInit(false))
        console.log("NO DATA")
      }
      if (data2 && data2[0].top3) {
        console.log("YES DATA2")
        dispatch(addInitLia(data2))
      } else {
        dispatch(addInitLia(false))
        console.log("NO DATA2")
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      setNetWorth(totAssets - totLiabilites)
      animate(totAssets, totLiabilites)
    }, [totAssets, totLiabilites, dims])
  );

  useEffect(() => {
    getData()
  }, [])
  return (
    <Template>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* FIXED BUTTON GROUP */}
        <View style={{ position: 'absolute', top: curTheme.statusBar, right: 12 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Entypo name="cog" size={30} color={curTheme.text} />
          </TouchableOpacity>
        </View>
        {/* HEADER ===================== */}
        <View style={styles.header}>
          {netWorth ? <Header netWorth={netWorth} styles={styles} /> : <View style={{ minHeight: 30 }}></View>}
          {/* Intl.NumberFormat('en-us').format(netWorth)  */}
          <View onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            setDims({ x, y, width, height });
          }} style={styles.barContainer}>
            <Animated.View style={[styles.bar, { backgroundColor: curTheme.green, width: widthAnim }]}></Animated.View>
            <View style={[styles.bar]}></View>
          </View>
          <View style={styles.barLabel}>
            <View style={styles.label}>
              <Text style={styles.labelText}>${totAssets.toLocaleString("en-US")}</Text>
              <Text style={styles.labelSubText}>Total Assets</Text>
            </View>
            <View style={[styles.label, { alignItems: 'flex-end' }]}>
              <Text style={styles.labelText}>${totLiabilites.toLocaleString("en-US")}</Text>
              <Text style={styles.labelSubText}>Total Liabilities</Text>
            </View>
          </View>
        </View>
      </View>
      {/* END MAIN ======================= */}
    </Template>
  );
}
const getTheme = (theme) => {
  return StyleSheet.create({
    header: {
      padding: 25
    },
    barLabel: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      alignItems: 'flex-start',
      flex: 1,
      flexGrow: 1,
      borderRadius: 10,
    },
    labelText: {
      color: theme.text,
      marginBottom: 5
    },
    labelSubText: {
      color: theme.text,
    },
    barContainer: {
      backgroundColor: theme.red,
      marginVertical: 18,
      minHeight: 18,
      overflow: 'hidden',
      borderRadius: 5,
      width: '100%',
      flexDirection: 'row'
    },
    bar: {
      minHeight: 18,
    },
    //SETTINGS PAGE
    input: {
      width: '100%',
      fontSize: 18,
      padding: 16,
      backgroundColor: theme.input,
      color: theme.text,
      marginVertical: 4,
      borderRadius: 6
    }, 
    addButton: {
      textAlign: 'center',
      backgroundColor: theme.input,
      marginVertical: 4,
      borderRadius: 4,
      padding: 5,
      flex: 0,
    },
    addButtonText: {
      color: theme.text,
      fontWeight: 'bold',
      fontSize: 18,
      padding: 3,
      textAlign: 'center'
    },
    themeButton:{
      padding:8,
      marginBottom:12,
      borderRadius:6,
      backgroundColor:theme.cardBg
    }
  });
}



