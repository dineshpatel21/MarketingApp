import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
} from "react-native";
import Header from "../components/Header";

export default function Dashboard(props: any) {
    const { openDrawer } = props;
    const recentSales = [
        {
            id: "1",
            name: "Apples",
            address: "Shiv Nagar Ring Road…",
            weight: "15 Kg",
        },
        {
            id: "2",
            name: "Bananas",
            address: "MG Road Near Market…",
            weight: "20 Kg",
        },
        {
            id: "3",
            name: "Grapes",
            address: "Ring Road Sector 4…",
            weight: "12 Kg",
        },
    ];


    const onAddProduct = () => {
        props.navigation.navigate("AddProduct");
    }
    return (
        <View style={styles.container}>

            {/* Header */}
            <Header openDrawer={openDrawer} />
            {/* TOP GRID CARDS */}
            <View style={styles.grid}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Check In</Text>
                    <Text style={styles.cardValue}>10:30 AM</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Check Out</Text>
                    <Text style={styles.cardValue}>6:00 PM</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Total Orders</Text>
                    <Text style={styles.cardValue}>30</Text>
                    <Text style={styles.note}>21 Sep</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Sales</Text>
                    <Text style={styles.cardValue}>₹ 10,000</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Recent Sales</Text>

            <FlatList
                data={recentSales}
                
                keyExtractor={(item: any) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: any) => (
                    <View style={styles.saleCard}>
                        <View style={styles.productImage} />
                        <View style={styles.saleDetails}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productAddress}>{item.address}</Text>
                            <Text style={styles.productWeight}>{item.weight}</Text>
                        </View>
                    </View>
                )}
            />



            <TouchableOpacity style={styles.addButton} onPress={onAddProduct}>
                <Text style={styles.addButtonText}>+ Add Order</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#FFF",
    },

    // GRID CARDS
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    card: {
        width: "48%",
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#DDD",
        marginBottom: 16,
    },

    cardTitle: {
        fontSize: 14,
        color: "#333",
        marginBottom: 6,
    },

    cardValue: {
        fontSize: 18,
        fontWeight: "700",
    },

    note: {
        marginTop: 4,
        color: "#666",
        fontSize: 12,
    },

    // SALES LIST
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
    },

    saleCard: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },

    productImage: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: "#AAA",
        borderRadius: 30,
        marginRight: 12,
    },

    saleDetails: {
        justifyContent: "center",
    },

    productName: {
        fontSize: 16,
        fontWeight: "700",
    },

    productAddress: {
        fontSize: 12,
        color: "#666",
        marginVertical: 4,
    },

    productWeight: {
        fontSize: 14,
        fontWeight: "600",
    },

    // ADD BUTTON
    addButton: {
        marginBottom: 15,
        // backgroundColor: "black",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#000",
    },

    addButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
    },
});
