import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import RecentSales from "../components/RecentSales";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { get_checkin_checkout, get_recent_sales, get_total_orders } from "../services/Services";


const Dashboard = (props: any) => {
    const { openDrawer, user } = props;

    const loggeduser = user ? user : props.route.params?.LoginUser

    const [sales, setSales] = useState()
    const [checkIn, setCheckIn] = useState()
    const [checkOut, setCheckOut] = useState()
    const [orders, setOrders] = useState()
    const [salesList, setSalesList] = useState([])
    const [loader, setLoader] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const userId = loggeduser?.id


    useEffect(() => {
        getCheckTime()
        getTotalOrders()
        getRecentList()
    }, [])

    const onRefresh = async () => {
        setRefreshing(true);
        getCheckTime()
        getTotalOrders()
        getRecentList()
        setRefreshing(false);
    };

    const getRecentList = async () => {
        setLoader(true)
        try {
            await get_recent_sales().then(async (res: any) => {
                if (res.status) {
                    setSalesList(res.data)
                }
            })
        } catch (error) {

        } finally {
            setLoader(false)
        }
    }

    const getCheckTime = async () => {
        try {
            await get_checkin_checkout(userId).then(async (res: any) => {
                if (res.status) {
                    setCheckIn(res.data.login_time)
                    setCheckOut(res.data.logout_time)
                }
            })
        } catch (error) {

        }
    }

    const getTotalOrders = async () => {
        try {
            await get_total_orders(userId).then(async (res: any) => {
                if (res.status) {
                    setSales(res.total_amount)
                    setOrders(res.total_orders)
                }
            })
        } catch (error) {

        }
    }

    const onAddProduct = () => {
        props.navigation.navigate("AddProduct", { getRecentList: getRecentList, LoginUser: loggeduser });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loader ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View> : <View style={styles.container}>

                    <Header openDrawer={openDrawer} ScreenName={"Dashboard"} user={loggeduser} />

                    {/* TOP CARDS */}
                    <View style={styles.grid}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Check In</Text>
                            <Text style={styles.cardValue}>{checkIn}</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Check Out</Text>
                            <Text style={[styles.cardValue,{textAlign:'center'}]}>{checkOut ?? "-"}</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Total Orders</Text>
                            <Text style={styles.cardValue}>{orders}</Text>
                            {/* <Text style={styles.note}>{orders.date}</Text> */}
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
                        data={salesList}
                        keyExtractor={(item: any, index: number) => index + "recentlist"}
                        renderItem={({ item }) => <RecentSales item={item} />}
                        showsVerticalScrollIndicator={true}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />


                    {/* ADD PRODUCT BUTTON */}
                    <TouchableOpacity style={styles.addButton} onPress={onAddProduct}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>

                </View>}
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
