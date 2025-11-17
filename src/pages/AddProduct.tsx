import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
} from "react-native";

export default function AddProduct() {
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#FFF" }}
            contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            {/* PICK IMAGE */}
            <Text style={styles.label}>Pick Image</Text>

            <TouchableOpacity style={styles.imagePicker}>
                <View style={styles.circle}>
                    <Text style={styles.plus}>+</Text>
                </View>
            </TouchableOpacity>

            {/* TITLE */}
            <Text style={styles.label}>Title</Text>
            <TextInput placeholder="Enter title" style={styles.input} />

            {/* QUANTITY */}
            <Text style={styles.label}>Quantity</Text>
            <TextInput placeholder="Enter quantity" style={styles.input} />

            {/* LOCATION */}
            <Text style={styles.label}>Add Location</Text>
            <TextInput
                placeholder="Enter location"
                style={[styles.input, { height: 120, textAlignVertical: "top" }]}
                multiline={true}
            />

            {/* BUTTON */}
            <TouchableOpacity style={styles.uploadBtn}>
                <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 20,
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
        marginTop: 10,
    },

    imagePicker: {
        width: "100%",
        height: 160,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#999",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },

    circle: {
        width: 70,
        height: 70,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },

    plus: {
        fontSize: 32,
        fontWeight: "bold",
    },

    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 15,
    },

    uploadBtn: {
        borderWidth: 1,
        borderColor: "#000",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30,
    },

    uploadText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
    },
});
