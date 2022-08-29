import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Template from "../components/Template"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from "../ThemeContext";
import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextComp from "../components/shared/TextComp";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProjectionCard from "../components/ProjectionCard";
import { nFormatter } from "../utils/numberFormatter";
import { Entypo, } from '@expo/vector-icons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuid } from 'uuid';
const Stack = createNativeStackNavigator();
const incomes = [{
  categoryName: 'Income',
  total: 5000
}]
const expenses = [{
  categoryName: 'Debt Payments',
  total: 2000
}]
// SWITCH DIVIDER
const ProjectionScreen = () => {
  const curTheme = useContext(ThemeContext)
  const styles = useMemo(() => {
    return getTheme(curTheme)
  }, [curTheme])

  const dispatch = useDispatch()

  const assets = useSelector(state => state.assets)
  const liabilities = useSelector(state => state.liabilities)

  // TOTAL VARIABLES
  const totAssets = useMemo(() => {
    if (!assets[0].top3) return 0
    return assets.reduce((a, b) => {
      return a + b.total
    }, 0) || 0
  }, [assets])

  const totLiabilites = useMemo(() => {
    if (!liabilities[0].top3) return 0
    return liabilities.reduce((a, b) => {
      return a + b.total
    }, 0) || 0
  }, [liabilities])
  const totIncome = useMemo(() => {
    // if (!incomes[0].top3) return 0
    return incomes.reduce((a, b) => {
      return a + b.total
    }, 0) || 0
  }, [incomes])

  const totExpense = useMemo(() => {
    // if (!assets[0].top3) return 0
    return expenses.reduce((a, b) => {
      return a + b.total
    }, 0) || 0
  }, [expenses])
  // USE EFFECT


  const initData = useMemo(() => {
    return {
      date: new Date(),
      data: {
        assets,
        liabilities,
        incomes: incomes,
        expenses: expenses,
        totAssets,
        totLiabilites,
        totIncome,
        totExpense,
      },

    }
  }, [totAssets, totLiabilites, assets, liabilities, expenses, incomes, totExpense, totIncome])



  return (
    <>
      < NavigationContainer independent={true} >
        <Stack.Navigator screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: curTheme.bg },
          animation: 'fade'
        }}
        >
          <Stack.Screen name={'Summary'} component={SummaryScreen} initialParams={{ initData }} />
          <Stack.Screen name={'List'} component={ListScreen} />
        </Stack.Navigator>
      </ NavigationContainer>
    </>
  )
}

{/* SUMMARY DIVIDER  */ }
const SummaryScreen = ({ navigation, route }) => {
  const curTheme = useContext(ThemeContext)
  const styles = useMemo(() => {
    return getTheme(curTheme)
  }, [curTheme])
  const [deviceId, setDeviceId] = useState(null)

  const getDeviceId = async () => {
    let val = JSON.parse(await AsyncStorage.getItem('@deviceId'))
    // console.log(val)
    if (val) {
      // console.log("YES ID")
      // dispatch(setId(val))
      setDeviceId(val)
    } else {
      // dispatch(create())
      setDeviceId(uuid())
      // console.log("NO ID")
    }
  }
  useEffect(() => {
    getDeviceId()
  }, [])
  const { initData } = route.params
  const { date, data } = initData

  const nextData = useMemo(() => {
    let obj = {
      date: new Date(new Date().setMonth(date.getMonth() + 1)),
      data: {
        assets: data.assets,
        liabilities: data.liabilities,
        incomes: data.incomes,
        expenses: data.expenses,
        totAssets: data.totAssets * 1.1 + data.totIncome,
        totLiabilites: data.totLiabilites * .9 - data.totExpense,
        totIncome: data.totIncome,
        totExpense: data.totExpense,
      },
      deviceId
    }
    return obj
  }, [date, data, initData, deviceId])

  const handleNavigate = (param) => {
    if (param) navigation.push('Summary', param)
    else {
      if (date.getMonth() === new Date().getMonth()) return
      else navigation.goBack()
    }
  }
  const handleTakeSnap = useCallback(async () => {
    // console.log(deviceId)
    await axios.post('http://192.168.12.209:5002/summary', {
      date,
      data,
      deviceId
    }).then((res) => {
      // console.log(res.data)
    })
  }, [date, data, deviceId])


  return (
    <>
      {/* <TextComp>{expense}</TextComp> */}
      {/* DIVIDER ACTION GROUPS */}
      <View style={styles.header}>
        {/* SNAPSHOT BUTTONS */}
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={[styles.navButton, { marginRight: 6, }]} onPress={handleTakeSnap}>
            <Entypo name='camera' size={20} color={curTheme.green} style={{ textAlign: 'center', overflow: 'hidden', width: 30, backgroundColor: 'transparent' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('List', { deviceId })}>
            <Entypo name='calendar' size={20} color={curTheme.green} style={{ textAlign: 'center', overflow: 'hidden', width: 30, backgroundColor: 'transparent' }} />
          </TouchableOpacity>
        </View>
        {/* NETWORTH AND NAV BUTTONS */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, width: '100%' }}>
          <TouchableOpacity style={styles.navButton} onPress={() => handleNavigate()}>
            <TextComp style={styles.navButtonText}>Prev</TextComp>
          </TouchableOpacity>
          <View>
            <TextComp variant='h1' style={{ fontSize: 35 }}>${nFormatter(data.totAssets - data.totLiabilites, 2)}</TextComp>
            <TextComp variant='body1' textAlign='center'>{date.toLocaleString('default', { month: 'long' })}</TextComp>
          </View>

          <TouchableOpacity style={styles.navButton} onPress={() => handleNavigate({ initData: nextData })}>
            <TextComp style={styles.navButtonText}>Next</TextComp>
          </TouchableOpacity>
        </View>
      </View>
      {/* DIVIDER DATA GROUPS */}
      <View style={styles.main}>
        <ProjectionCard entity={data.assets} addEnabled={false} title='Assets' total={data.totAssets} />
        <ProjectionCard entity={data.liabilities} addEnabled={false} title='Liabilities' total={data.totLiabilites} />
        <ProjectionCard entity={data.incomes} addEnabled title='Money in' total={data.totIncome} />
        <ProjectionCard entity={data.expenses} addEnabled title='Money out' total={data.totExpense} />
      </View>
    </>

  )
}
{/* LIST DIVIDER  */ }
const ListScreen = ({ navigation, route }) => {
  const { deviceId } = route.params
  const [data, setData] = useState([])
  const fetchData = async() => {
    console.log("HELLO FETCHING SUMMARIES with", deviceId)
    await axios.get('http://192.168.12.209:5002/summary/'+deviceId).then(({ data }) => {
      console.log(data)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <View style={{ paddingTop: 90 }}>
      <TextComp>HELLO</TextComp>
    </View>
  )
}
export default ProjectionScreen

const getTheme = (theme) => StyleSheet.create({
  header: {
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    alignItems: 'center',
    paddingTop: theme.statusBar,
    // paddingBottom: 30,
    marginBottom: 18,
    backgroundColor: theme.bg,
  },
  main: {
    paddingHorizontal: 12,
  },
  navButton: {
    padding: 8,
    borderRadius: 3,
    backgroundColor: theme.cardBg
  },
  navButtonText: {
    color: theme.green
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 18,
    // borderBottomWidth: 1,
    // borderColor: '#444'
  },
  label: {
    fontWeight: '200',
    flex: 1,
    color: theme.text,
    fontSize: 16
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
  },
})

