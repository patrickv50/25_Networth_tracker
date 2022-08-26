import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { View } from 'react-native'
import TextComp from '../shared/TextComp'

const StockDetail = ({ item }) => {
  const [profile, setProfile] = useState({})
  const fetchData = async () => {
    await axios.get(`https://networthtrkr.herokuapp.com/profile/${item.name}`).then(res => {
      setProfile(JSON.parse(res.data))
      console.log(JSON.parse(res.data))
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <View style={{backgroundColor:'red'}}>
      <TextComp variant='h3'>
        {profile.companyName}
      </TextComp>
      <TextComp variant='h4'>
        {item.value}
      </TextComp>
      <TextComp variant='body1'>
        {profile.ceo}
      </TextComp>
      <TextComp variant='body1'>
        {profile.state}
      </TextComp>
      <TextComp variant='body1'>
        {profile.city}
      </TextComp>
      <TextComp variant='body1'>
        {profile.description}
      </TextComp>
    </View>
  )
}

export default StockDetail