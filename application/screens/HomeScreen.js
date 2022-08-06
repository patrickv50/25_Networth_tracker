import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import Header from '../components/Header';
import Input from '../components/Input';
import Item from '../components/Item';
import Template from '../components/Template';
import theme from '../theme';

export default function HomeScreen() {
  const [assets, setAssets] = useState([])
  const [liabilities, setLiabilities] = useState([])
  const [assetWindowOpen, setAssetWindowOpen] = useState(true)

  const [modalOpen, setModalOpen] = useState(false)
  const netWorth = useMemo(() => {
    let totAssets = assets.reduce((a, b) => a + b.value, 0) || 0
    let totLiabilites = liabilities.reduce((a, b) => a + b.value, 0) || 0
    return totAssets - totLiabilites
  }, [assets, liabilities])

  const addEntity = (entity, setNew) => {
    setNew(state => {
      // console.log([...state, entity])
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
        <View style={styles.mainHeader}>
          <TouchableOpacity style={styles.buttonSwitch} onPress={() => setAssetWindowOpen(x => !x)}>
            <Text style={styles.buttonSwitchText}>{assetWindowOpen ? "Asset" : "Liability"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSwitch} onPress={() => setModalOpen(x => !x)}>
            <Text style={styles.buttonSwitchText}>+</Text>
          </TouchableOpacity>
        </View>
        <Modal transparent={true} animationType='slide' visible={modalOpen}>
          <Input setAssets={setAssets} setLiabilities={setLiabilities} addEntity={addEntity} assetWindowOpen={assetWindowOpen} setModalOpen={setModalOpen} />
        </Modal>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={assetWindowOpen ? assets : liabilities}
          renderItem={({ item, index }) => {
            return (
              <Item item={item} index={index} />
            )
          }}
        >
        </FlatList>
      </View>
      {/* END MAIN ======================= */}


 
    </Template>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 50,
    flexGrow: 0,
    // backgroundColor:'red'
  },
  main: {
    flexGrow: 1,
    flex: 1,
    padding: 10,
    // backgroundColor:'green'
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 0,
    marginBottom: 10,
    alignItems: 'center'

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


