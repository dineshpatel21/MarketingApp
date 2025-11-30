import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { Add_Product, get_category_list, get_product_list } from "../services/Services";
import { Dropdown } from "react-native-element-dropdown";
import ImageCropPicker from "react-native-image-crop-picker";


const AddProduct = (props: any) => {
    const { user } = props
    const { getRecentList, LoginUser } = props.route.params

    const [product, setProduct] = useState();
    const [category, setCategory] = useState();
    const [categoryList, setCategoryList] = useState([])
    const [productList, setProductList] = useState([])
    const [image, setImage] = useState<any>()
    const [title, setTitle] = useState()
    const [quantity, setQuantity] = useState<any>("1")
    const [price, setPrice] = useState<any>()
    const [priceValue, setPriceValue] = useState<any>()
    const [location, setLocation] = useState<any>()
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getCategoryList()
    }, [])

    useEffect(() => {
        if (price && quantity) {
            setPriceValue((price * parseFloat(quantity)).toString())
        }
    }, [quantity, price])

    const getCategoryList = async () => {
        try {
            await get_category_list().then(async (res: any) => {
                if (res.status) {
                    const newCategoryList = res.data.map((item: any) => ({ ...item, label: item.title, value: item.id }))
                    setCategoryList(newCategoryList)
                }
            })
        } catch (error) {

        }
    }

    const getProductList = async (categoryId: number) => {
        try {
            await get_product_list(categoryId).then(async (res: any) => {
                if (res.status) {
                    const newProductList = res.data.map((item: any) => ({ ...item, label: item.title, value: item.id }))
                    setProductList(newProductList)
                }
            })
        } catch (error) {

        }
    }


    const onClickUpload = () => {
       
        Alert.alert(
            "Upload Image",
            "Choose an option",
            [
                { text: "Camera", onPress: pickCamera },
                { text: "Gallery", onPress: pickImage },
                { text: "Cancel", style: "cancel" }
            ]
        );

    };

    const pickCamera = () => {
        ImageCropPicker.openCamera({
            width: 400,
            height: 400,
            cropping: true,
        }).then((image: any) => {
            console.log("Image path using camera : ",image);
            setImage(image);
        });
    };

    const pickImage = () => {
        ImageCropPicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
        }).then((image: any) => {
            console.log("Image path using gallery : ",image);
            setImage(image);
        });
    };

    const onUpload = async () => {
        setLoader(true)
        const formData = new FormData();
        formData.append("emp_id", LoginUser.id);
        formData.append("category_id", category);
        formData.append("product_id", product);
        formData.append("quantity", quantity);
        formData.append("price", price);
        formData.append("total", priceValue);
        formData.append("location", location);
        formData.append("image", {
            uri: image?.path,
            name: image?.filename,
            type: image?.mime
        });

        try {
            await Add_Product(formData).then((res: any) => {
                console.log("ADDING PRODUCTS: ", JSON.stringify(res));
                if (res.status) {
                    props.navigation.goBack()
                    getRecentList()
                }
            })

        } catch (error) {

        } finally {
            setLoader(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1, backgroundColor: colors.beige }}
                contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
                keyboardShouldPersistTaps="handled"
            >
                {/* PICK IMAGE */}
                <Text style={styles.label}>Pick Image</Text>

                <TouchableOpacity style={styles.imagePicker} onPress={onClickUpload}>
                    {
                        image
                            ?
                            <Image source={{ uri: image.path }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                            :
                            <View style={styles.circle}>
                                <Text style={styles.plus}>+</Text>
                            </View>
                    }
                </TouchableOpacity>

                {/* TITLE */}
                {/* <Text style={styles.label}>Title</Text>
                <TextInput
                    value={title}
                    onChangeText={(text: any) => setTitle(text)}
                    placeholder="Enter title"
                    placeholderTextColor={colors.textLight}
                    style={styles.input}
                /> */}

                {/* QUANTITY */}
                <Text style={styles.label}>Quantity</Text>
                <TextInput
                    value={quantity}
                    keyboardType="number-pad"
                    onChangeText={(text: any) => setQuantity(text)}
                    placeholder="Enter quantity"
                    placeholderTextColor={colors.textLight}
                    style={styles.input} />

                <Text style={styles.label}>Select Category</Text>
                <Dropdown
                    style={styles.input}
                    search
                    searchPlaceholder="Search category"
                    data={categoryList}
                    labelField="label"
                    valueField="value"
                    placeholder="Choose category"
                    value={category}
                    onChange={(item) => {
                        setCategory(item.value);
                        getProductList(item.value)
                    }}
                />

                {/* PRODUCT */}

                <Text style={styles.label}>Select Product</Text>
                <Dropdown
                    style={styles.input}
                    search
                    searchPlaceholder="Search product"
                    data={productList}
                    labelField="label"
                    valueField="value"
                    placeholder="Choose product"
                    value={product}
                    onChange={(item) => {
                        setProduct(item.value);
                        setPrice(item.price)
                    }}
                />

                {/* PRODUCT */}

                {/* PRICE */}
                <Text style={styles.label}>Price</Text>
                <TextInput
                    value={priceValue}
                    editable={false}
                    placeholder="Enter price"
                    placeholderTextColor={colors.textLight}
                    style={styles.input}
                />

                {/* LOCATION */}
                <View style={styles.locationContainer}>
                    <Text style={[styles.label, { marginTop: 0 }]}>Add Location</Text>
                    {/* <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity> */}
                </View>
                <TextInput
                    value={location}
                    onChangeText={text => setLocation(text)}
                    // placeholder="Enter location"
                    placeholderTextColor={colors.textLight}
                    style={[styles.input, { height: 120, textAlignVertical: "top" }]}
                    multiline={true}
                />

                {/* BUTTON */}
                <TouchableOpacity style={styles.uploadBtn} onPress={onUpload}>
                    {
                        loader ?
                            <ActivityIndicator size={"small"} color={colors.white} />
                            : <Text style={styles.uploadText}>Upload</Text>}
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
        alignItems: 'center',
        marginBottom: 6
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
