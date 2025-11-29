import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid,
} from "react-native";
import { colors } from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Utils } from "../../Utils";
import { login } from "../services/Services";

const LoginScreen = (props: any) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loader, setLoader] = useState(false)

    const onLogin = async () => {
        setLoader(true)
        const body = {
            "email": email,
            "password": password,
        }

        try {
            await login(body).then(async (res: any) => {
                console.log("login result :", JSON.stringify(res));
                if (res.status) {
                    setLoader(false)
                    props.navigation.replace("Dashboard");
                    await Utils.storeData("logged_user", JSON.stringify(res.user))
                    await Utils.storeData("token", res.token)
                } else {
                    ToastAndroid.show(res.message, ToastAndroid.SHORT);
                }
            })
        } catch (error) {

        } finally {
            setLoader(false)
        }

    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                {/* LOGO */}
                <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                {/* EMAIL */}
                <View style={{ width: "90%" }}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="Enter email"
                        placeholderTextColor={colors.textLight}
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                </View>

                {/* PASSWORD */}
                <View style={{ width: "90%" }}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder="Enter password"
                        placeholderTextColor={colors.textLight}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                    />
                </View>

                {/* BUTTON */}
                <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
                    {loader
                        ? <ActivityIndicator size={"small"} color={colors.white} />
                        : <Text style={styles.loginButtonText}>Login</Text>}
                </TouchableOpacity>
            </View>
            {/* </View> */}
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.beige,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    logo: {
        width: 200,
        height: 200,
        marginBottom: 5,
        marginTop: 10,
    },

    card: {
        // width: "100%",
        flex: 1,
        backgroundColor: colors.white,
        padding: 25,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: colors.primary,
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    heading: {
        fontSize: 26,
        fontWeight: "700",
        color: colors.primaryDark,
        textAlign: "center",
        marginBottom: 25,
    },

    label: {
        fontSize: 16,
        color: colors.primaryDark,
        marginBottom: 6,
        fontWeight: "600",
    },

    input: {
        width: "100%",
        color: colors.textDark,
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: colors.primary,
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        marginBottom: 22,
    },

    loginButton: {
        width: "90%",
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 30,
        marginTop: 10,
        elevation: 4,
    },

    loginButtonText: {
        color: colors.white,
        fontSize: 18,
        textAlign: "center",
        fontWeight: "700",
    },
});
