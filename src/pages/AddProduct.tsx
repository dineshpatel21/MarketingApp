import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";


const AddProduct = ()=> {

    const onClickUpload = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('Error: ', response.errorCode);
            } else {
                console.log('Selected image:', response.assets[0].uri);
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1, backgroundColor: colors.beige }}
                contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
            >
                {/* PICK IMAGE */}
                <Text style={styles.label}>Pick Image</Text>

                <TouchableOpacity style={styles.imagePicker} onPress={onClickUpload}>
                    <View style={styles.circle}>
                        <Text style={styles.plus}>+</Text>
                    </View>
                </TouchableOpacity>

                {/* TITLE */}
                <Text style={styles.label}>Title</Text>
                <TextInput placeholder="Enter title" placeholderTextColor={colors.textLight} style={styles.input} />

                {/* QUANTITY */}
                <Text style={styles.label}>Quantity</Text>
                <TextInput placeholder="Enter quantity" placeholderTextColor={colors.textLight} style={styles.input} />

                {/* PRICE */}
                <Text style={styles.label}>Price</Text>
                <TextInput placeholder="Enter price" placeholderTextColor={colors.textLight} style={styles.input} />

                {/* LOCATION */}
                <Text style={styles.label}>Add Location</Text>
                <TextInput
                    placeholder="Enter location"
                    placeholderTextColor={colors.textLight}
                    style={[styles.input, { height: 120, textAlignVertical: "top" }]}
                    multiline={true}
                />

                {/* BUTTON */}
                <TouchableOpacity style={styles.uploadBtn}>
                    <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

export default AddProduct;

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
        marginTop: 12,
        color: colors.textDark,
    },

    imagePicker: {
        width: "100%",
        height: 170,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: colors.border,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        marginBottom: 20,
    },

    circle: {
        width: 75,
        height: 75,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },

    plus: {
        fontSize: 34,
        fontWeight: "800",
        color: colors.primary,
    },

    input: {
        width: "100%",
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: "#FFF",
        color: colors.textDark,
        marginBottom: 30,
        elevation: 1,
    },

    uploadBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        elevation: 3,
    },

    uploadText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
    },
});
