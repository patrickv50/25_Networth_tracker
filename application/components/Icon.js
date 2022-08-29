import React from 'react'
import { View } from 'react-native'
import { Entypo, } from '@expo/vector-icons';

const Icon = ({ name, size, color }) => {
    return (
        <View style={{ marginRight:5, aspectRatio: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:color, borderRadius: 4,  }}>
            <Entypo name={name} size={size} color='#ffffff' style={{ textAlign: 'center', overflow: 'hidden',width: 30, backgroundColor: 'transparent' }} />
        </View>
    )
}

export default Icon