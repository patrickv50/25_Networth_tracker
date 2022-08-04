import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';

export default function App() {
  const [assets, setAssets] = useState([])
  const [liabilities, setLiabilities] = useState([])
  const [assetWindowOpen, setAssetWindowOpen] = useState(true)
  const [name, setName] = useState("")
  const [value, setValue] = useState(0)

  const netWorth = useMemo(() => {
    let totAssets = assets.reduce((a, b) => a + b.value, 0) || 0
    let totLiabilites = liabilities.reduce((a, b) => a + b.value, 0) || 0
    return totAssets - totLiabilites
  }, [assets, liabilities])

  const addEntity = (entity, setNew) => {
    setNew(state => {
      console.log([...state, entity])
      return [...state, entity]
    })
    setName("")
    setValue(0)
  }
  useEffect(() => {
    console.log("HELLO ")
  }, [])

  return (
    <View style={styles.app}>
      <StatusBar hidden={true} style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.header1}>${netWorth}</Text>
        </View>
        <View>
          <Text style={styles.subtitle1}>Net Worth</Text>
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.mainHeader}>
       
          <Text style={[styles.header2, { flexGrow: 1 }]}>{assetWindowOpen ? "Assets" : "Liabilities"}</Text>
          <Button onPress={() => setAssetWindowOpen(x => !x)} title="switch" />
        </View>
        <FlatList
        showsVerticalScrollIndicator={false}
          data={assetWindowOpen ? assets : liabilities}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.card}>
                <Text>{item.name}</Text>
                <Text>${item.value}</Text>
              </View>
            )
          }}
          ListHeaderComponent={(
            <View style={styles.card}>
              <TextInput style={{ fontSize: 18, padding: 5, backgroundColor: '#eee', marginVertical: 2 }} value={name} onChangeText={x => setName(x)} placeholder="Name" />
              <TextInput style={{ fontSize: 18, padding: 5, backgroundColor: '#eee', marginVertical: 2 }} value={value ? String(value) : ''} onChangeText={x => {
                if (!x.length) setValue(0)
                if (Number(x)) setValue(Number(x))
              }
              } placeholder="Value" />
              <Button onPress={() => addEntity({ name: name, value: value }, assetWindowOpen ? setAssets : setLiabilities)} title={assetWindowOpen ? 'Add asset' : 'Add Liability'} />
            </View>)}
        >

        </FlatList>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flexGrow: 1,
  },
  header: {
    padding: 10,
    flexGrow: 0,
    // borderColor: 'red',
    // borderWidth: 1
  },
  main: {
    flexGrow: 1,
    flex: 1,
    padding: 10,
    // borderColor: 'blue',
    // borderWidth: 2,
  },
  mainHeader: {
    flexGrow: 0,
    flexDirection: 'row',
  },
  mainContent: {
    // borderWidth: 4,
    // borderColor: 'green',
    flexGrow: 1,

  },
  list: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: 'pink',
  },
  card: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#000'
  },



  header1: {
    fontSize: 40
  },
  header2: {
    fontSize: 28
  },
  subtitle1: {
    fontSize: 15,
    color: '#888'
  },

});
