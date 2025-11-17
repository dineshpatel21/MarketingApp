import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

const LoginScreen = (props: any) => {

    const onLogin = () => {
        props.navigation.replace("Dashboard");
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    placeholder="Id"
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={onLogin} >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    card: {
        width: "100%",
        maxWidth: 300,
        padding: 24,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#CCCCCC",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 30,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        // backgroundColor: "#000",
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: "#FFFFFF",
        paddingVertical: 14,
        borderRadius: 20,
    },
    buttonText: {
        color: "#000",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 16,
    },
});

export default LoginScreen;