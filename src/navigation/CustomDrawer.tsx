import React, { useState } from "react";
import {
    Animated,
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ToastAndroid,
    StyleSheet,
} from "react-native";
import { colors } from "../theme/colors";
import { Utils } from "../../Utils";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { logout } from "../services/Services";
import { StageURL } from "../../key";


const CustomDrawer = (props: any) => {
    const { DRAWER_WIDTH, translateX, closeDrawer, user } = props
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)

    const onLogout = async () => {
        setLoader(true)
        try {
            await logout().then(async (res: any) => {
                if (res.status) {
                    closeDrawer();
                    Utils.clearAllData()
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "LoginScreen" }],
                        })
                    );
                } else {
                    ToastAndroid.show(res.message, ToastAndroid.SHORT);
                }
            })
        } catch (error) {

        } finally {
            setLoader(false)
        }
    }



    return (
        <Animated.View
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: DRAWER_WIDTH,
                transform: [{ translateX }],
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                paddingHorizontal: 20,
                paddingTop: 50,
                elevation: 10,
                backgroundColor: colors.beige,
            }}
        >
            {/* Profile */}
            <View style={{ alignItems: "center", marginBottom: 10 }}>
                <Image
                    source={{ uri: `${StageURL.url}images/employee/${user?.image}` }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />

                <Text style={{ fontSize: 18, fontWeight: "600" }}>{user?.name}</Text>

                <View
                    style={{
                        width: "80%",
                        height: 1,
                        backgroundColor: "#ccc",
                        marginVertical: 10,
                    }}
                />
            </View>

            <View style={{ gap: 10, }}>
                <View>
                    <Text style={styles.title}>
                        Email
                    </Text>
                    <Text style={styles.value}>{user.email}</Text>
                </View>

                <View>
                    <Text style={styles.title}>
                        Mobile
                    </Text>
                    <Text style={styles.value}>{user.number}</Text>
                </View>

                <View>
                    <Text style={styles.title}>
                        Aadhaar
                    </Text>
                    <Text style={styles.value}>{user.aadhar}</Text>
                </View>

                <View>
                    <Text style={styles.title}>
                        Address
                    </Text>
                    <Text style={styles.value}>{user.address}</Text>
                </View>
            </View>

            {/* Logout */}
            <View
                style={{
                    position: "absolute",
                    bottom: 30,
                    left: 20,
                    right: 20,
                }}
            >
                <TouchableOpacity
                    onPress={onLogout}
                    style={{
                        backgroundColor: colors.primary,
                        paddingVertical: 12,
                        borderRadius: 10,
                        alignItems: "center",
                    }}
                >
                    {loader
                        ? <ActivityIndicator size={"small"} color={colors.white} /> :
                        <Text style={{ fontSize: 18, color: "#fff" }}>Logout</Text>}
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 15, fontWeight: "600", color: colors.textLight },
    value: { fontSize: 14, fontWeight: '400', color: colors.textDark }
})
export default CustomDrawer;
