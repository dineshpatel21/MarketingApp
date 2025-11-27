import React from "react";
import {
    Animated,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { colors } from "../theme/colors";
import { Utils } from "../../Utils";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { logout } from "../services/Services";


const CustomDrawer = (props: any) => {
    const { DRAWER_WIDTH, translateX, closeDrawer, user } = props
    const navigation = useNavigation()
    

    const onLogout = async () => {
        try {
            await logout().then(async (res: any) => {
                console.log("logout result :", JSON.stringify(res));
                if (res.status) {
                    closeDrawer();
                    Utils.clearAllData()
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "LoginScreen" }],
                        })
                    );
                }
            })
        } catch (error) {

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
            <View style={{ alignItems: "center", marginBottom: 40 }}>
                <View
                    style={{
                        width: 80,
                        height: 80,
                        backgroundColor: "#eee",
                        borderRadius: 40,
                        marginBottom: 10,
                    }}
                />

                <Text style={{ fontSize: 18, fontWeight: "600" }}>{user.name}</Text>

                <View
                    style={{
                        width: "80%",
                        height: 1,
                        backgroundColor: "#ccc",
                        marginVertical: 20,
                    }}
                />
                <Text style={{ fontSize: 14, fontWeight: "500" }}>{user.email}</Text>
                <Text style={{ fontSize: 14, fontWeight: "500" }}>{user.number}</Text>
                <Text style={{ fontSize: 14, fontWeight: "500" }}>{user.aadhar}</Text>
                <Text style={{ fontSize: 14, fontWeight: "500" }}>{user.address}</Text>
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
                    <Text style={{ fontSize: 18, color: "#fff" }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

export default CustomDrawer;
