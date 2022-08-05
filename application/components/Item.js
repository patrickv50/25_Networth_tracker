import { StyleSheet, Text, View } from "react-native"
import theme from "../theme"

const Item = ({ item, index }) => {
    console.log((item.value).toLocaleString("en-US"))
    return (
        <View key={index} style={styles.card}>
            <View style={{ flex: 1 }}>
                <Text style={styles.nameContainer}>{item.name || "No Name"}</Text>
                <Text style={styles.categoryContainer}>{item.category || "No Category"}</Text>
            </View>

            <Text style={styles.valueContainer}>${(item.value).toLocaleString("en-US")}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.cardBg,
        flexDirection: 'row',
        padding: 15,
        marginBottom: 8,
        borderRadius: 7,
        // borderBottomWidth: 1,
        borderColor: '#eee'
    },
    nameContainer: {
        fontSize: 15,
        color: theme.text
    },
    categoryContainer: {
        fontSize: 12,
        color: '#777'
    },
    valueContainer: {
        fontSize: 15,
        color: theme.text
    }

})
export default Item