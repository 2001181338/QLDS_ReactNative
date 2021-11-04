
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuanLyThongTin from '../quan-ly-thong-tin/quan-ly-thong-tin';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QuanLyDatVe from '../dat-ve/quan-ly-dat-ve';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#275dd5',
                tabBarIconStyle: {
                    backgroundColor: '#fff'
                },
                tabBarStyle: {
                    backgroundColor: '#303030'
                }
            }}>
            <Tab.Screen name="Đặt vé" component={QuanLyDatVe}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name={'train'} style={{ color: '#fff' }} size={20} />
                    ),
                    headerTitleAllowFontScaling: true,
                    tabBarLabel: "Đặt vé",
                    headerStyle: {
                        backgroundColor: '#303030'
                    },
                    headerTintColor: '#ffffff'
                }} />
            <Tab.Screen name="QuanLyThongtin" component={QuanLyThongTin}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name={'ticket-alt'} style={{ color: '#fff' }} size={20} />
                    ),
                    headerTitleAllowFontScaling: true,
                    tabBarLabel: "Đơn mua vé",
                    headerStyle: {
                        backgroundColor: '#303030'
                    },
                    headerTintColor: '#ffffff'
                }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        fontWeight: "bold",
        fontSize: 50
    },
});
