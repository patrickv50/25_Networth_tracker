import {  StyleSheet, Text, View } from "react-native"
import NumberSlides from "./NumberSlides"

const Header = ({ netWorth }) => {

    return (
        <>
            <View style={styles.header}>
                {netWorth?<NumberSlides value={netWorth} size={52} delay={0} duration={1000} side='center'/>:<View style={{}}/>}
                <Text style={styles.subtitle1}>Net Worth</Text>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    header:{
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
