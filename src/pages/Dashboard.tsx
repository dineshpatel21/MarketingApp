import React from "react";
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

                 <View style={{ backgroundColor: colors.beige, marginVertical: 10}}>
                            <Text style={styles.sectionTitle}>Recent Sales</Text>
                        </View>

                {/* RECENT SALES */}
                <FlatList
                    data={recentSales}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <RecentSales item={item} />}
                    showsVerticalScrollIndicator={false}
                    // contentContainerStyle={{ paddingBottom: 40 }}
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
        borderColor: colors.cardBorder,
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
