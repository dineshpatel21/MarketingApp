import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import Header from "../components/Header";
import RecentSales from "../components/RecentSales";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";


const Dashboard = (props: any) => {
    const { openDrawer } = props;

    const [sales, setSales] = useState("10,000")
    const [checkIn, setCheckIn] = useState("10:30 AM")
    const [checkOut, setCheckOut] = useState("6:00 PM")
    const [orders, setOrders] = useState({ order: 30, date: '21 Sep' })
    const [salesList, setSalesList] = useState([])

    const recentSales = [
        { id: "1", name: "Apples", address: "Shiv Nagar Ring Road…", weight: "15 Kg" },
        { id: "2", name: "Bananas", address: "MG Road Near Market…", weight: "20 Kg" },
        { id: "3", name: "Grapes", address: "Ring Road Sector 4…", weight: "12 Kg" },
        { id: "4", name: "Apples", address: "Shiv Nagar Ring Road…", weight: "15 Kg" },
    ];

    const onAddProduct = () => {
        props.navigation.navigate("AddProduct");
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <Header openDrawer={openDrawer} ScreenName={"Dashboard"} />

                {/* TOP CARDS */}
                <View style={styles.grid}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Check In</Text>
                        <Text style={styles.cardValue}>{checkIn}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Check Out</Text>
                        <Text style={styles.cardValue}>{checkOut}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Total Orders</Text>
                        <Text style={styles.cardValue}>{orders.order}</Text>
                        <Text style={styles.note}>{orders.date}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Sales</Text>
                        <Text style={styles.cardValue}>₹ {sales}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: colors.beige, marginVertical: 10 }}>
                    <Text style={styles.sectionTitle}>Recent Sales</Text>
                </View>

                {/* RECENT SALES */}
                <FlatList
                    data={recentSales}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <RecentSales item={item} />}
                    showsVerticalScrollIndicator={false}
                />


                {/* ADD PRODUCT BUTTON */}
                <TouchableOpacity style={styles.addButton} onPress={onAddProduct}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}
export default Dashboard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.beige,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    card: {
        width: "48%",
        backgroundColor: "#FFF",
        borderRadius: 14,
        padding: 16,
        borderWidth: 1.5,
        borderColor: colors.border,
        marginBottom: 16,
        elevation: 2,
    },

    cardTitle: {
        fontSize: 14,
        color: colors.textLight,
        marginBottom: 4,
    },

    cardValue: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.textDark,
    },

    note: {
        marginTop: 4,
        color: colors.textLight,
        fontSize: 12,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
        color: colors.primary,
    },

    addButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: colors.primary,
        width: 55,
        height: 55,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },

    addButtonText: {
        color: "#FFF",
        fontSize: 28,
        fontWeight: "700",
        marginTop: -2,
    },
});
