import { LinearGradient } from "expo-linear-gradient"
import {  StyleSheet, Text, View } from "react-native"
import theme from "../theme"
import NumberSlides from "./NumberSlides"

const Header = ({ netWorth }) => {

    return (
        <>
            <View style={styles.header}>
                {netWorth?<NumberSlides value={netWorth} size={52} fontWeight='bold' delay={0} duration={1000} side='center'/>:<View style={{}}/>}
                <Text style={styles.subtitle1}>Net Worth</Text>
                <LinearGradient
                    colors={[theme.bg, 'rbga(200,200,200,.5)']}
                    style={{
                        height: 20,
                        width: '100%',
                        position: 'absolute',
                        top:0,
                        zIndex: 99
                    }}
                    locations={[.20, .90]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    header:{
        // backgroundColor:'red',
        minHeight:80,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    subtitle1: {
        fontSize: 15,
        color: '#888'
    },
})



export default Header
