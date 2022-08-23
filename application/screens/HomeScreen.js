import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Template from '../components/Template';
import { addInit } from '../state/reducers/assetsReducer';
import { addInit as addInitLia } from '../state/reducers/liabilitiesReducer';
import theme from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HomeScreen({ navigation }) {
  const assets = useSelector((state) => state.assets)
  const liabilities = useSelector((state) => state.liabilities)
  const [dims, setDims] = useState({});
  const [netWorth, setNetWorth] = useState(0)
  const dispatch = useDispatch()

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
    Animated.timing(widthAnim, {
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setNetWorth(totAssets - totLiabilites)
      if (dims.width) animate(totAssets, totLiabilites)
    })
    return unsubscribe
  }, [navigation, totAssets, totLiabilites])

  useEffect(() => {
    getData()
  }, [])
  return (
    <Template>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* HEADER ===================== */}
        <View style={styles.header}>
          <Header netWorth={netWorth} styles={styles} />
          {/* Intl.NumberFormat('en-us').format(netWorth)  */}
          <View onLayout={(event) => {
            console.log(event.nativeEvent.layout)
            const { x, y, width, height } = event.nativeEvent.layout;
            setDims({ x, y, width, height });
          }} style={styles.barContainer}>
            <Animated.View style={[styles.bar, { backgroundColor: 'rgb(21,238,108)', width: widthAnim }]}></Animated.View>
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
        {/* MAIN ======================= */}
        <View style={styles.main}>
        </View>
      </View>
      {/* END MAIN ======================= */}



    </Template>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 25
  },
  main: {
    paddingHorizontal: 15,
    paddingBottom: 150,
    flex: 0,
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
    // padding: 12
    // backgroundColor: 'red'
  },
  labelText: {
    color: '#fff',
    marginBottom: 5
  },
  labelSubText: {
    color: '#999'
  },
  barContainer: {
    backgroundColor: 'rgb(255,42,82)',
    marginVertical: 18,
    minHeight: 18,
    overflow: 'hidden',
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row'
  },
  bar: {
    minHeight: 18,
    // borderRadius: 15,
  },
  mainContent: {
    flexGrow: 1,
  },
  buttonSwitch: {
    backgroundColor: theme.text,
    color: theme.bg,
    padding: 10,
    borderRadius: 5
  },
  buttonSwitchText: {
    fontSize: 25
  },

  header1: {
    color: theme.text,
    fontSize: 40
  },
  header2: {
    color: theme.text,
    fontSize: 28
  },
  subtitle1: {
    fontSize: 15,
    color: theme.text
  },
  background: {
    height: 200,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 99
  },

});


