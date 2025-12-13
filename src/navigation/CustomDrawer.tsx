import React, { useEffect, useState } from "react";
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

    const [loginUser, setLoginUser] = useState(user)

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

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const user = await Utils.getData("logged_user");
        setLoginUser(JSON.parse(user))
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
                    source={{ uri: `${StageURL.url}public/images/employee/${loginUser?.image}` }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />

                <Text style={{ fontSize: 18, fontWeight: "600" }}>{loginUser?.name}</Text>

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
                    <Text style={styles.value}>{loginUser?.email}</Text>
                </View>

                <View>
                    <Text style={styles.title}>
                        Mobile
                    </Text>
                    <Text style={styles.value}>{loginUser?.number}</Text>
                </View>

                <View>
                    <Text style={styles.title}>
                        Aadhaar
                    </Text>
                    <Text style={styles.value}>{loginUser?.aadhar}</Text>
                </View>

                <View>
                    <Text style={styles.title}>
                        Address
                    </Text>
                    <Text style={styles.value}>{loginUser?.address}</Text>
                </View>
            </View>

            {/* Customer Support */}
            <View
                style={{
                    position: "absolute",
                    bottom: 90,
                    left: 20,
                    right: 20,
                    backgroundColor: "#fff",
                    padding: 12,
                    borderRadius: 10,
                    // elevation: 3,
                    borderWidth: 0.5,
                    borderColor: "#ddd"
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: "700", color: colors.textDark, marginBottom: 6 }}>
                    Support
                </Text>

                <View >
                    <Text style={styles.title}>Mobile: </Text>
                    <Text style={styles.value}>
                        +91 - 1234567890
                    </Text>
                </View>
                <View >
                    <Text style={styles.title}>Email: </Text>
                    <Text style={styles.value}>
                        dinesh.patel36936@gmail.com
                    </Text>
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
    value: { fontSize: 14, fontWeight: '400', color: colors.textDark },
    container: {
        padding: 18,
        flex: 1,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 12,
        marginBottom: 16,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
    },
    button2: {
        backgroundColor: "#FFF",
        borderWidth: 1.5,
        borderColor: colors.primary,
        padding: 10,
        borderRadius: 12,
    },
    buttonText2: {
        color: colors.primary,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
    }
})
export default CustomDrawer;
