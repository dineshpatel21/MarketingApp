import React from "react";
import {
    Animated,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { colors } from "../theme/colors";


const CustomDrawer = (props: any) => {
    const { DRAWER_WIDTH, translateX, closeDrawer } = props

    const onLogout = () => {
        closeDrawer();
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

                <Text style={{ fontSize: 18, fontWeight: "600" }}>Alan</Text>

                <View
                    style={{
                        width: "80%",
                        height: 1,
                        backgroundColor: "#ccc",
                        marginVertical: 20,
                    }}
                />
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
