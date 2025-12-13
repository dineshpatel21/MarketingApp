import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    ScrollView,
    ActivityIndicator,
    ToastAndroid,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../theme/colors";
import { Dropdown } from "react-native-element-dropdown";
import { sumbit_leave } from "../services/Services";
import { Utils } from "../../Utils";


const LeaveForm = (props: any) => {
    const [leave_type, setLeaveType] = useState("Other");
    const [leave_reason, setLeaveReason] = useState("");
    const [leave_days, setLeaveDays] = useState<any>(1);
    const [leave_list, setLeaveList] = useState(
        [
            { value: 1, label: "Sick leave" },
            { value: 2, label: "Casual leave" },
            { value: 3, label: "Urgent leave" },
            { value: 4, label: "Half day leave" },
            { value: 5, label: "Optional holiday leave" },
            { value: 6, label: "Other" }
        ])

    // DATE STATES
    const [fromDate, setFromDate] = useState<any>(new Date());
    const [toDate, setToDate] = useState<any>(new Date());

    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [loader, setLoader] = useState(false)

    useEffect(() => { fromDate && toDate && calculateDaysCount(fromDate, toDate) }, [fromDate, toDate])

    // Format date to DD-MM-YYYY for backend
    const formatDate = (date: any) => {
        let d = new Date(date);
        let day = String(d.getDate()).padStart(2, "0");
        let month = String(d.getMonth() + 1).padStart(2, "0");
        let year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };


    const calculateDaysCount = (d1: any, d2: any) => {
        const date1: any = new Date(d1);
        const date2: any = new Date(d2);
        const diffTime = date2 - date1;
        const diffDays = (diffTime / (1000 * 60 * 60 * 24));
        const days = Math.floor(diffDays);
        setLeaveDays(days)
    }

    const sumbitLeave = async () => {
        setLoader(true)
        const LoginUser = JSON.parse(await Utils.getData("logged_user"))
        try {
            const formData = new FormData();
            formData.append("employee_id", LoginUser.id);
            formData.append("leave_type", leave_type);
            formData.append("leave_from_date", formatDate(fromDate));
            formData.append("leave_to_date", formatDate(toDate));
            formData.append("leave_reason", leave_reason);
            formData.append("leave_days", leave_days)

            console.log("Leave body : ", formData);

            await sumbit_leave(formData).then(async (res: any) => {
                 console.log("Leave body : ", JSON.stringify(res));
                if (res.status) {
                    setLoader(false)
                    ToastAndroid.show("Application sent", ToastAndroid.SHORT);
                    props.navigation.navigate("LeaveList")
                }
            })
        } catch (error) {
            setLoader(false)
        }
    }

    return (
        <ScrollView style={styles.container}>
            {/* <Text style={[styles.heading, { marginTop: 20, alignSelf: 'center' }]}>Apply for Leave</Text> */}

            {/* LEAVE TYPE */}
            <Text style={styles.label}>Leave Type</Text>
            <Dropdown
                style={styles.input}
                search
                searchPlaceholder="Enter leave type"
                data={leave_list}
                labelField="label"
                valueField="value"
                placeholder="Choose leave type"
                value={leave_type}
                onChange={(item) => {
                    setLeaveType(item.label)
                }}
            />

            {/* FROM DATE */}
            <Text style={styles.label}>From Date</Text>
            <TouchableOpacity
                style={styles.dateBox}
                onPress={() => setShowFromPicker(true)}
            >
                <Text style={styles.dateText}>{formatDate(fromDate)}</Text>
            </TouchableOpacity>

            {showFromPicker && (
                <DateTimePicker
                    value={fromDate}
                    placeholderText="Date"
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowFromPicker(Platform.OS === "ios");
                        if (selectedDate) setFromDate(selectedDate);
                    }}
                />
            )}

            {/* TO DATE */}
            <Text style={styles.label}>To Date</Text>
            <TouchableOpacity
                style={styles.dateBox}
                onPress={() => setShowToPicker(true)}
            >
                <Text style={styles.dateText}>{formatDate(toDate)}</Text>
            </TouchableOpacity>

            {showToPicker && (
                <DateTimePicker
                    value={toDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowToPicker(Platform.OS === "ios");
                        if (selectedDate) setToDate(selectedDate);
                    }}
                />
            )}

            {/* DAYS */}
            <Text style={styles.label}>Total days</Text>
            <TextInput
                value={leave_days + ""}
                editable={false}
                placeholder=""
                placeholderTextColor={colors.textLight}
                style={styles.input}
            />

            <Text style={[styles.label]}>Reason</Text>
            <TextInput
                value={leave_reason}
                onChangeText={text => setLeaveReason(text)}
                // placeholder="Enter location"
                placeholderTextColor={colors.textLight}
                style={[styles.input, { height: 120, textAlignVertical: "top", marginBottom: 10 }]}
                multiline={true}
            />


            {/* SUBMIT BUTTON */}
            <TouchableOpacity style={styles.button} onPress={sumbitLeave}>
                {
                    loader ?
                        <ActivityIndicator size={"small"} color={colors.white} />
                        : <Text style={styles.buttonText}>Submit Leave</Text>}

            </TouchableOpacity>
        </ScrollView>
    );
};

const Input = ({ label, ...props }: any) => (
    <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} {...props} />
    </View>
);

export default LeaveForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: colors.beige,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
        marginTop: 12,
        color: colors.textDark,
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
    dateBox: {
        backgroundColor: "#fff",
        padding: 12,
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 12,
        marginBottom: 14,
    },
    dateText: {
        fontSize: 16,
        color: "#222",
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
    },
});
