import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import theme from '../../theme'
import TextComp from '../shared/TextComp'
import { AreaChart, Grid, LineChart, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Entypo, } from '@expo/vector-icons';

const StockDetail = ({ item, goBack }) => {
  const [profile, setProfile] = useState({})
  const [price, setPrice] = useState({})
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const fecthProfile = async () => {
    await axios.get(`https://networthtrkr.herokuapp.com/profile/${item.name}`)
      .then((response) => {
        setLoading(false)
        setProfile(response.data)
        console.log(response.data)
      })
  }
  const fetchPriceHistory = async () => {
    await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/5min/${item.name}?apikey=5e76645e9f1037cc199a52a4409bc05c`)
      .then(({ data }) => {
        // console.log(data[0])
        // console.log(data.length)
        setData(data)
      })
  }
  const fetchQuote = async () => {
    await axios.get(`https://networthtrkr.herokuapp.com/quote/${item.name}`)
      .then(({ data }) => {
        setPrice(data)
      })
  }
  useEffect(() => {
    fecthProfile()
    fetchPriceHistory()
    fetchQuote()
  }, [item])

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Entypo name='chevron-left' size={32} color={theme.green} style={{ width: 25, fontWeight: '600' }} />
        </TouchableOpacity>
        <TextComp variant='h1' textAlign='left' weight='bold'>{profile.symbol}</TextComp>
        <TextComp variant='h1' textAlign='left' weight='bold'>{price.current?`$${price.current}`:''}</TextComp>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <TextComp variant='body1' textAlign='left' style={{ color: price.change > 0 ? theme.green : theme.red, marginRight: 4 }}>${nFormatter(price.change, 2)}</TextComp>
          <TextComp variant='body1' textAlign='left' >Today</TextComp>
        </View>
      </View>
      {loading ?
        <Skeleton /> :
        <>
          {/* HEADER SECTION */}

          <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
            {/* CHART SECTION =========== */}
            <View>
              <LineChart
                showGrid={false}
                yAccessor={({ item }) => (item.close)}
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 0, bottom: 30, left: 10, right: 10 }}
                svg={{ stroke: theme.green, strokeWidth: 1 }}
              >
              </LineChart>
            </View>
            {/* SHARES SECTION ============ */}
            <View style={styles.sharesSection}>
              <TextComp variant='h2' textAlign='left' weight='bold' style={styles.sectionHeader}>Your shares</TextComp>
              <View style={styles.sharesCard}>
                <TextComp variant='body1' textAlign='left' style={styles.sharesLabel}>Shares</TextComp>
                <TextComp variant='h2' textAlign='left' weight='bold'>{item.shares || 0}</TextComp>
              </View>
              <View style={styles.sharesCard}>
                <TextComp variant='body1' textAlign='left' style={styles.sharesLabel}>Value</TextComp>
                <TextComp variant='h2' textAlign='left' weight='bold'>${price.current && nFormatter(item.shares * price.current, 2) || 0}</TextComp>
              </View>
            </View>
            {/* ABOUT SECTION ============ */}
            <View style={[styles.aboutSection]}>
              <TextComp variant='h2' textAlign='left' weight='bold' style={styles.sectionHeader}>About {profile.symbol}</TextComp>
              <TextComp numLines={aboutExpanded ? 0 : 3} variant='body1' textAlign='left'>{profile.description}</TextComp>
              <TouchableOpacity onPress={() => setAboutExpanded(x => !x)}>
                <TextComp variant='body1' style={{ textDecorationLine: 'underline', color: theme.green, marginVertical: 8 }} textAlign='left'>Show {aboutExpanded ? 'less' : 'more'}</TextComp>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
                <View style={styles.aboutCard}>
                  <TextComp variant='body1' textAlign='left' style={styles.aboutLabel}>CEO</TextComp>
                  <TextComp variant='body1' textAlign='left'>{profile.ceo}</TextComp>
                </View>
                <View style={styles.aboutCard}>
                  <TextComp variant='body1' textAlign='left' style={styles.aboutLabel}>IPO date</TextComp>
                  <TextComp variant='body1' textAlign='left'>{profile.ipoDate}</TextComp>
                </View>
                <View style={styles.aboutCard}>
                  <TextComp variant='body1' textAlign='left' style={styles.aboutLabel}>Employees</TextComp>
                  <TextComp variant='body1' textAlign='left'>{Number(profile.fullTimeEmployees).toLocaleString('en-US')}</TextComp>
                </View>
                <View style={styles.aboutCard}>
                  <TextComp variant='body1' textAlign='left' style={styles.aboutLabel}>Headquarters</TextComp>
                  <TextComp variant='body1' textAlign='left'>{profile.city}, {profile.state && capitalizeFirstLetter(profile.state.toLowerCase())}</TextComp>
                </View>
              </View>
            </View>
            {/* STATS SECTION ============ */}
            <View style={styles.statsSection}>
              <TextComp variant='h2' textAlign='left' weight='bold' style={styles.sectionHeader}>Stats</TextComp>
              <View style={[styles.statsCard, styles.marginRight]}>
                <TextComp variant='body1' textAlign='left' style={styles.statsLabel}>Avg vol</TextComp>
                <TextComp variant='body1' textAlign='left'>{nFormatter(Number(profile.volAvg), 2)}</TextComp>
              </View>
              <View style={[styles.statsCard, styles.marginLeft]}>
                <TextComp variant='body1' textAlign='left' style={styles.statsLabel}>Mkt cap</TextComp>
                <TextComp variant='body1' textAlign='left'>{nFormatter(Number(profile.mktCap), 2)}</TextComp>
              </View>
            </View>
          </ScrollView>
        </>
      }

    </View>
  )
}

const Skeleton = () => {
  return (
    <View>

    </View>

  )
}

const styles = StyleSheet.create({
  main: {
    paddingTop: theme.statusBar,
    flex: 1,
    backgroundColor: theme.cardBg,
    paddingHorizontal: 14
  },
  header: {
    marginBottom: 12
  },
  body: {
    // backgroundColor:'red',
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 8,
    width: '100%'
  },
  // ===================
  sharesSection: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: .5,
    borderColor: '#555',
    paddingBottom: 8,
    marginBottom: 28,
  },
  sharesCard: {
    width: '45%'
  },
  sharesLabel: {
    color: '#666',
    marginBottom: 8
  },
  // ===================
  aboutSection: {
    marginBottom: 28,
  },
  aboutCard: {
    paddingVertical: 5,
    // backgroundColor: 'red',
    width: '50%'
  },
  aboutLabel: {
    color: '#999',
    marginBottom: 4
  },
  // ===================
  statsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 150
  },
  statsCard: {
    paddingVertical: 5,
    borderBottomWidth: .3,
    borderColor: '#666',
    width: '45%',
    flexDirection: 'row',
  },
  marginRight: {
    marginRight: '2.5%'
  },
  marginLeft: {
    marginLeft: '2.5%'
  },
  statsLabel: {
    color: '#999',
    flex: 1
  }

})

function nFormatter(num, digits) {
  if(!num) return ''
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : num.toFixed(2);
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default StockDetail



