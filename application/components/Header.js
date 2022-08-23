import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Text, View } from "react-native"
import theme from "../theme"
import NumberSlides from "./NumberSlides"

const Header = ({ netWorth }) => {

    return (
        <>
            <View style={styles.header}>
                <NumberSlides value={netWorth} size={52} fontWeight='bold' delay={0} duration={1000} side='center' />
                <Text style={styles.subtitle1}>Net Worth</Text>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    header: {
        // backgroundColor:'red',
        minHeight: 80,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    subtitle1: {
        fontSize: 15,
        color: '#888'
    },
})



export default Header
