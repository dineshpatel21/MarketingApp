import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import LeaveListItem from '../components/LeaveListItem'
import { get_leave_list_data } from '../services/Services'
import { colors } from '../theme/colors'
import { Utils } from '../../Utils'

const LeaveList = (props: any) => {
    const [leaveData, setLeaveData] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getLeaveListData()
    }, [])

    const getLeaveListData = async () => {
        setLoader(true)
        const LoginUser = JSON.parse(await Utils.getData("logged_user"))
        console.log("LoginUser : ",LoginUser.id);
        
        try {
            await get_leave_list_data(LoginUser.id).then(async (res: any) => {
                console.log("result : ",res);
                
                if (res.status) {
                    setLeaveData(res.data)
                }
            })
        } catch (error) {
            setLoader(false)
        } finally {
            setLoader(false)
        }

    }


    return (
        <View style={styles.container}>
            {
                loader ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={"large"} color={colors.primary} />
                    </View>
                    : <FlatList
                        data={leaveData}
                        renderItem={({ item, index }) => <LeaveListItem item={item} index={index} props={props}/>}
                        style={{paddingHorizontal: 20,}}
                        keyExtractor={(item, index) => index.toString()}
                    />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1,  backgroundColor: colors.beige, }
})
export default LeaveList