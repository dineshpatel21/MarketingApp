import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StageURL } from '../../key';
import { colors } from '../theme/colors';

const Header = (props: any) => {
    const { openDrawer, user } = props;

    const onDrawerPress = () => {
        openDrawer();
    }

    return (
        <View style={styles.header} >
            <TouchableOpacity style={styles.menuButton} onPress={onDrawerPress}>
                <Image source={require("../assets/icons/hamburger.png")} tintColor={"#000"} style={{ width: 32, height: 32 }} />
            </TouchableOpacity>

            <View style={styles.profileContainer}>
                <Text style={styles.userName}>{user?.name}</Text>
                <TouchableOpacity style={styles.profileCircle}>
                    <Image source={{ uri: `${StageURL.url}images/employee/${user?.image}` }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                </TouchableOpacity>
            </View>
        </View>
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
        borderWidth: 1,
        borderColor: colors.textLight,
    },

    profileContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    }
})