import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Header = (props: any) => {
    const { openDrawer } = props;

    const onDrawerPress = () => {
        openDrawer();
    }

    return (
        <View style={styles.header} >
            <TouchableOpacity style={styles.menuButton} onPress={onDrawerPress}>
                <Image source={require("../assets/icons/hamburger.png")} tintColor={"#000"} style={{ width: 32, height:32 }} />
            </TouchableOpacity>

            <View style={styles.profileContainer}>
                <Text style={styles.userName}>Alan</Text>
                <TouchableOpacity style={styles.profileCircle} />
            </View>
        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    menuButton: {
        padding: 5,
    },

    // HEADER
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        // borderWidth:1
    },

    menuIcon: {
        fontSize: 24,
        fontWeight: "bold",
    },

    userName: {
        fontSize: 16,
        fontWeight: "600",
    },

    profileCircle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "black",
    },

    profileContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    }
})