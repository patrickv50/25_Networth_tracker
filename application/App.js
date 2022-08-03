import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View,Button, TextInput, ScrollView } from 'react-native';

export default function App() {
  const [assets,setAssets] = useState([{name:'Car',value:10000}])
  const [liabilities,setLiabilities] = useState([{name:'AmazonCard',value:3500}])
  const [name,setName] = useState("")
  const [value,setValue] = useState(0)

  const netWorth=useMemo(()=>{
    let totAssets=assets.reduce((a,b)=>a+b.value,0) || 0
    let totLiabilites=liabilities.reduce((a,b)=>a+b.value,0) || 0
    return totAssets-totLiabilites
  },[assets,liabilities])

  const addEntity=(entity,setNew)=>{
    setNew(state=>{
      console.log([...state,entity])
      return [...state,entity]
      })
  }

  const handleChange=(x)=>{
    setName(x)
  }
  useEffect(()=>{
    console.log("HELLO ")
  },[])

  return (
    <View  style={styles.main}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.header1}>${netWorth}</Text>
        <Text style={styles.subtitle1}>Net Worth</Text>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.header2}>Assets</Text>
        <ScrollView>
        <View style={styles.card}>
            <TextInput value={name} onChangeText={x=>setName(x)} placeholder="Name"/>
            <TextInput value={value} onChangeText={x=>setValue(Number(x))} placeholder="Value"/>
            <Button onPress={()=>addEntity({name:name,value:value},setAssets)} title='Add asset'/>
          </View>
        {assets.map((asset,index)=>(
          <View key={index} style={styles.card}>
            <Text>{asset.name}</Text>
            <Text>${asset.value}</Text>
          </View>
        ))}
          
          </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display:'flex',
    padding:10,
    marginTop:50,
    borderWidth:0,
    borderColor:'blue',
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth:2,
    height:'80%'
  },
  header:{
    flexGrow:0,
    marginBottom:10
  },
  cardContainer:{
    height:200,
    borderWidth:2,
    borderColor:'blue',
    flexGrow:1,
    gap:8,
    padding:10
  },
  card:{
    minWidth:200,
    padding:10,
    marginBottom:8,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#000'
  },
  header1:{
    fontSize:40
  },
  header2:{
    fontSize:28
  },
  subtitle1:{
    fontSize:15,
    color:'#888'
  },
 
});
