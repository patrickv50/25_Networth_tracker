import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Template from "../components/Template"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from "../ThemeContext";
import { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import TextComp from "../components/shared/TextComp";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProjectionCard from "../components/ProjectionCard";
import { nFormatter } from "../utils/numberFormatter";
const Stack = createNativeStackNavigator();

const ProjectionScreen = () => {
  const curTheme = useContext(ThemeContext)
  const styles = useMemo(() => {
    return getTheme(curTheme)
  }, [curTheme])

  const assets = useSelector(state => state.assets)
  const liabilities = useSelector(state => state.liabilities)

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

  const initData = useMemo(() => {
    return {
      month: '0',
      data: {
        assets,
        liabilities,
        totAssets,
        totLiabilites,
        totIncome: 5500,
        totExpense: 2000,
      }
    }
  }, [totAssets, totLiabilites, assets, liabilities])


  return (
    <>

      < NavigationContainer independent={true} >
        <Stack.Navigator screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: curTheme.bg },
        }}
        >
          <Stack.Screen name={'Summary'} component={SummaryScreen} initialParams={{ initData }} />
        </Stack.Navigator>
      </ NavigationContainer>
    </>
  )
}

const SummaryScreen = ({ navigation, route }) => {
  const curTheme = useContext(ThemeContext)
  const styles = useMemo(() => {
    return getTheme(curTheme)
  }, [curTheme])

  const { initData } = route.params
  const { month, data } = initData
  const nextData = useMemo(() => {
    let obj = {
      month: String(Number(month) + 1),
      data: {
        assets: data.assets,
        liabilities: data.liabilities,
        totAssets: data.totAssets * 1.1,
        totLiabilites: data.totLiabilites * .9,
        totExpense: data.totExpense,
        totIncome: data.totIncome,
      }
    }
    return obj
  }, [month, data, initData])

  return (
    <>
      {/* <TextComp>{expense}</TextComp> */}
      {/* DIVIDER ACTION GROUPS */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <TextComp style={styles.navButtonText}>Back</TextComp>
        </TouchableOpacity>
        <View>
          <TextComp variant='h1'>${nFormatter(data.totAssets - data.totLiabilites)}</TextComp>
          <TextComp variant='body2' textAlign='center'>{month} Projection</TextComp>
        </View>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.push('Summary', { initData: nextData })}>
          <TextComp style={styles.navButtonText}>Next</TextComp>
        </TouchableOpacity>
      </View>
      {/* DIVIDER DATA GROUPS */}
      <View style={styles.main}>
        <ProjectionCard entity={data.assets} title='Assets' total={data.totAssets} />
        <ProjectionCard entity={data.liabilities} title='Liabilities' total={data.totLiabilites} />
        <ProjectionCard entity={[]} title='Money in' total={data.totIncome} />
        <ProjectionCard entity={[]} title='Money out' total={data.totExpense} />
      </View>
    </>

  )
}

export default ProjectionScreen

const getTheme = (theme) => StyleSheet.create({
  header: {
    paddingHorizontal:12,
    alignItems:'center',
    paddingTop: theme.statusBar,
    marginBottom:18,
    backgroundColor: theme.bg,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  main: {
    paddingHorizontal: 12,
  },
  navButton: {
    padding: 8,
    borderRadius:3,
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

