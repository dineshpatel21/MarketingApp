import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const LeaveOverview = (props: any) => {
  const { data } = props.route.params
  

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Row label="Employee Name" value={data?.user_name} />
        <Row label="Leave Type" value={data?.leave_type} />
        <Row label="Status" value={data?.leave_status} />
        <Row label="From" value={data?.leave_from_date} />
        <Row label="To" value={data?.leave_to_date} />
        <Row label="Total Days" value={data?.leave_days} />
        <Row label="Reason" value={data?.leave_reason} />
        <Row label="Requested On" value={data?.created_at} />
      </View>
    </View>
  );
};

const Row = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default LeaveOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.beige,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#1a1a1a",
  },
  card: {
    // backgroundColor: "#fff",
    // padding: 18,
    // borderRadius: 12,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 3,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
});
