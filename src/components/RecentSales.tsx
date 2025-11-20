import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors';

const RecentSales = ({ item }: any) => {
    return (
        <View style={styles.saleCard}>
            <View style={styles.productImage} />

            <View style={styles.saleDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productAddress}>{item.address}</Text>
                <Text style={styles.productWeight}>{item.weight}</Text>
            </View>
        </View>
    )
}

export default RecentSales

const styles = StyleSheet.create({
    saleCard: {
        flexDirection: "row",
        borderWidth: 1.5,
        borderColor: colors.cardBorder,
        backgroundColor: "#FFF",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        elevation: 2,
    },

    productImage: {
        width: 60,
        height: 60,
        borderWidth: 1.5,
        borderColor: colors.primary,
        borderRadius: 30,
        marginRight: 14,
    },

    saleDetails: {
        justifyContent: "center",
    },

    productName: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.textDark,
    },

    productAddress: {
        fontSize: 12,
        color: colors.textLight,
        marginVertical: 3,
    },

    productWeight: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.primary,
    },
});
