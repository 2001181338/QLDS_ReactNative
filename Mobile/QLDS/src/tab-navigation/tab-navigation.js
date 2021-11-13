
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuanLyThongTin from '../quan-ly-thong-tin/quan-ly-thong-tin';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QuanLyDatVe from '../dat-ve/quan-ly-dat-ve';
import DatGhe from '../dat-ghe/chuyentau';
import ToaGhe from '../toa-va-ghe/ToaGhe';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarIconStyle: {
                    backgroundColor: '#fff'
                },
                tabBarStyle: {
                    backgroundColor: '#0a70c9'
                }
            }}>
            <Tab.Screen name="Đặt vé" component={DatGhe}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name={'train'} style={{ color: '#fff' }} size={20} />
                    ),
                    headerTitleAllowFontScaling: true,
                    tabBarLabel: "Đặt vé",
                    headerStyle: {
                        backgroundColor: '#40a9e7'
                    },
                    headerTintColor: '#ffffff',
                    tabBarInactiveTintColor: "#afafaf"
                }} />
            <Tab.Screen name="Toa ghế" component={ToaGhe}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name={'train'} style={{ color: '#fff' }} size={20} />
                    ),
                    headerTitleAllowFontScaling: true,
                    tabBarLabel: "Toa ghế",
                    headerStyle: {
                        backgroundColor: '#40a9e7'
                    },
                    headerTintColor: '#ffffff',
                    tabBarInactiveTintColor: "#afafaf"
                }} />
            <Tab.Screen name="QuanLyThongtin" component={QuanLyThongTin}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name={'ticket-alt'} style={{ color: '#fff' }} size={20} />
                    ),
                    headerTitleAllowFontScaling: true,
                    tabBarLabel: "Đơn mua vé",
                    headerStyle: {
                        backgroundColor: '#40a9e7'
                    },
                    headerTintColor: '#ffffff',
                    tabBarInactiveTintColor: "#afafaf"
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
