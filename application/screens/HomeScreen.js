import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Input from '../components/Input';
import Template from '../components/Template';
import theme from '../theme';

export default function HomeScreen() {
  const assets = useSelector((state) => state.assets)
  const liabilities = useSelector((state) => state.liabilities)
  const [assetWindowOpen, setAssetWindowOpen] = useState(true)

  const [modalOpen, setModalOpen] = useState(false)

  const totAssets = useMemo(() => {
    return assets.reduce((a, b) => a + b.value, 0) || 0
  }, [assets])

  const totLiabilites = useMemo(() => {
    return liabilities.reduce((a, b) => a + b.value, 0) || 0
  }, [liabilities])

  const netWorth = useMemo(() => {
    return totAssets - totLiabilites
  }, [totAssets, totLiabilites])
  const addEntity = (entity, setNew) => {
    setNew(state => {
      return [...state, entity]
    })
  }
  useEffect(() => {
    console.log("HELLO ")
  }, [])

  const funcX = () => {
  }
  return (
    <Template>
      {/* HEADER ===================== */}
      <View style={styles.header}>
        <Header netWorth={netWorth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} styles={styles} />
        {/* Intl.NumberFormat('en-us').format(netWorth)  */}
      </View>
      {/* MAIN ======================= */}
      <View style={styles.main}>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Total Assets</Text>
            <Text style={styles.cardText}>${totAssets}</Text>
            <View style={styles.cardBarContainer}>
              <View style={[styles.cardBar, { backgroundColor:'rgb(21,238,108)', width: `${(100 * (totAssets)) / (totAssets+totLiabilites)}%` }]}></View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Total Liabilities</Text>
            <Text style={styles.cardText}>${totLiabilites}</Text>
            <View style={styles.cardBarContainer}>
              <View style={[styles.cardBar, { backgroundColor:'rgb(255,42,82)', width: `${(100 * (totLiabilites)) / (totAssets+totLiabilites)}%` }]}></View>
            </View>
          </View>
          {/* <TouchableOpacity style={styles.buttonSwitch} onPress={() => setAssetWindowOpen(x => !x)}>
            <Text style={styles.buttonSwitchText}>{assetWindowOpen ? "Asset" : "Liability"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSwitch} onPress={() => setModalOpen(x => !x)}>
            <Text style={styles.buttonSwitchText}>+</Text>
          </TouchableOpacity> */}
        </View>
        <Modal transparent={true} animationType='slide' visible={modalOpen}>
          {/* <Input setLiabilities={setLiabilities} addEntity={addEntity} assetWindowOpen={assetWindowOpen} setModalOpen={setModalOpen} /> */}
        </Modal>
      </View>
      {/* END MAIN ======================= */}



    </Template>
  );
}

const styles = StyleSheet.create({
  header: {
    flexGrow: 0,
    // backgroundColor:'red'
  },
  main: {
    flexGrow: 1,
    flex: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    marginTop:20
  },
  card: {
    marginHorizontal:10,
    alignItems: 'flex-start',
    flex: 1,
    flexGrow: 1,
    backgroundColor: theme.cardBg,
    borderRadius: 10,
    padding: 12
  },
  cardText: {
    color: '#fff',
    marginBottom:5
  },

  cardBarContainer: {
    minHeight: 8,
    overflow:'hidden',
    borderRadius: 3,
    backgroundColor: '#444',
    width: '100%',
  },
  cardBar: {
    minHeight: 8,
    borderRadius: 3,
  },
  mainContent: {
    // borderWidth: 4,
    // borderColor: 'green',
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


