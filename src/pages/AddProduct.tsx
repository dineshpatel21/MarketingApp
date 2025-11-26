import React, { useState } from "react";
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
import { Add_Product } from "../services/Services";
import { Dropdown } from "react-native-element-dropdown";


const AddProduct = () => {
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [categoryList, setCategoryList] = useState([])
    const [productList, setProductList] = useState([])
    const [image, setImage] = useState()
    const [title, setTitle] = useState()
    const [quantity, setQuantity] = useState()
    const [price, setPrice] = useState()
    const [location, setLocation] = useState()

    const items = [
        { label: "Apple", value: "1" },
        { label: "Banana", value: "2" },
        { label: "Grapes", value: "3" },
        { label: "Mango", value: "4" },
    ];

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

    const onUpload = async () => {
        const body = {
            "id": 4,
            "emp_id": "3",
            "title": "ffff",
            "quantity": "324",
            "price": "8000",
            "location": "asdf",
            "image": "1764161914.jpeg",
            "created_at": "2025-11-26 18:28:34",
            "updated_at": "2025-11-26 18:30:02",
            "emp_name": "Omdeep Bareth"
        }

        try {
            await Add_Product(body).then((res: any) => {

            })

        } catch (error) {

        }
    }

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
                <TextInput
                    value={title}
                    onChangeText={(text: any) => setTitle(text)}
                    placeholder="Enter title"
                    placeholderTextColor={colors.textLight}
                    style={styles.input}
                />

                {/* QUANTITY */}
                <Text style={styles.label}>Quantity</Text>
                <TextInput
                    value={quantity}
                    onChangeText={(text: any) => setQuantity(text)}
                    placeholder="Enter quantity"
                    placeholderTextColor={colors.textLight}
                    style={styles.input} />

                <Text style={styles.label}>Select Category</Text>
                <Dropdown
                    style={styles.input}
                    search
                    searchPlaceholder="Search category"
                    data={items}
                    labelField="label"
                    valueField="value"
                    placeholder="Choose category"
                    value={category}
                    onChange={(item) => {
                        setCategory(item.value);
                    }}
                />

                {/* PRODUCT */}

                <Text style={styles.label}>Select Product</Text>
                <Dropdown
                    style={styles.input}
                    search
                    searchPlaceholder="Search product"
                    data={items}
                    labelField="label"
                    valueField="value"
                    placeholder="Choose product"
                    value={product}
                    onChange={(item) => {
                        setProduct(item.value);
                    }}
                />

                {/* PRODUCT */}

                {/* PRICE */}
                <Text style={styles.label}>Price</Text>
                <TextInput
                    value={quantity}
                    onChangeText={(text: any) => setPrice(text)}
                    placeholder="Enter price"
                    placeholderTextColor={colors.textLight}
                    style={styles.input}
                />

                {/* LOCATION */}
                <View style={styles.locationContainer}>
                    <Text style={[styles.label, { marginTop: 0 }]}>Add Location</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    value={location}
                    // placeholder="Enter location"
                    placeholderTextColor={colors.textLight}
                    style={[styles.input, { height: 120, textAlignVertical: "top" }]}
                    multiline={true}
                />

                {/* BUTTON */}
                <TouchableOpacity style={styles.uploadBtn} onPress={onUpload}>
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
        marginBottom: 20,
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

    dropdown: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addLocation: {
        marginLeft: 8
    },
    addButton: {

        backgroundColor: colors.primary,
        width: 25,
        height: 25,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8

    },
    addButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "700",
        marginTop: -2,
    },
});
