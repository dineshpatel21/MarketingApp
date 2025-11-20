import { useEffect, useEffectEvent, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard"
import AddProduct from "../pages/AddProduct";
import LoginScreen from "../pages/LoginScreen";
import CustomDrawer from "../navigation/CustomDrawer";
import { navigationRef } from "./NavigationService";


const Stack = createNativeStackNavigator()

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * .75

const Navigation = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;


    useEffect(() => {
        if (drawerVisible) {
            // OPEN drawer
            Animated.timing(translateX, {
                toValue: 0,
                duration: 500,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }).start();
        } else {
            // CLOSE drawer
            Animated.timing(translateX, {
                toValue: -DRAWER_WIDTH,
                duration: 500,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }).start();
        }
    }, [drawerVisible]);

    const openDrawer = () => {
        setIsDrawerOpen(true);
        setTimeout(() => {
            setDrawerVisible(true);
        }, 10);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);

        setTimeout(() => {
            setIsDrawerOpen(false);
        }, 500);
    };

    return (
        <NavigationContainer ref={navigationRef}>

            <Modal
                visible={isDrawerOpen}
                animationType="fade"
                transparent
                statusBarTranslucent
                onRequestClose={closeDrawer}
            >
                {/* OUTSIDE area */}
                <TouchableWithoutFeedback onPress={closeDrawer}>
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", flexDirection: "row" }}>

                        {/* DRAWER – stop propagation */}
                        <TouchableWithoutFeedback>
                            <View style={{ width: DRAWER_WIDTH, height: "100%", }}>
                                <CustomDrawer
                                    translateX={translateX}
                                    DRAWER_WIDTH={DRAWER_WIDTH}
                                    closeDrawer={closeDrawer}
                                />
                            </View>
                        </TouchableWithoutFeedback>

                        {/* REMAINING SCREEN -> outside touch area */}
                        <View style={{ flex: 1 }} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            
            <Stack.Navigator screenOptions={{}}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: true, headerTitleAlign: "center", headerTitle: 'Add Product' }} />
                <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
                    {props => <Dashboard {...props} drawerVisible={drawerVisible} translateX={translateX} openDrawer={openDrawer} />}
                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation;