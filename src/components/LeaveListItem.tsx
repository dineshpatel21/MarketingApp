import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const LeaveListItem = ({ item, index, props }: any) => {


    const showLeaveDetail = () => {
        props.navigation.navigate("LeaveOverview", { data: item })
    }
    return (
        <TouchableOpacity onPress={showLeaveDetail} style={styles.card} key={index}>
            <View style={styles.rowBetween}>
                <Text style={styles.leaveType}>{item.leave_type}</Text>

                <View
                    style={[
                        styles.badge,
                        item.leave_status === "Pending" && styles.pending,
                        item.leave_status === "Approved" && styles.approved,
                        item.leave_status === "Rejected" && styles.rejected,
                    ]}
                >
                    <Text style={styles.badgeText}>{item.leave_status}</Text>
                </View>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>From:</Text>
                <Text style={styles.value}>{item.leave_from_date}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>To:</Text>
                <Text style={styles.value}>{item.leave_to_date}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Days:</Text>
                <Text style={styles.value}>{item.leave_days}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default LeaveListItem;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 14,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    leaveType: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },
    badge: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "600",
    },
    pending: {
        backgroundColor: "#f5a623",
    },
    approved: {
        backgroundColor: "#4caf50",
    },
    rejected: {
        backgroundColor: "#e53935",
    },
    row: {
        flexDirection: "row",
        marginBottom: 4,
    },
    label: {
        width: 60,
        color: "#666",
        fontSize: 14,
    },
    value: {
        fontWeight: "600",
        fontSize: 14,
        color: "#222",
    },
});
