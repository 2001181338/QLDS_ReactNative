
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuanLyThongTin from '../quan-ly-thong-tin/quan-ly-thong-tin';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QuanLyDatVe from '../dat-ve/quan-ly-dat-ve';
import ToaGhe from '../toa-va-ghe/ToaGhe';
import NhapThongTinHanhKhach from './../nhap-thong-tin-hanh-khach/nhap-thong-tin-hanh-khach';
import TabViewExample from './../tab-test/TabViewExample';
import ThongTinKhach from '../thong-tin-khach/thong-tin-khach';
import NganHang from '../ngan-hang/ngan-hang';
import TimKiemThongTinVe from '../tim-ve/tim-kiem-thong-tin-ve';
import QuanLyDonVe from '../quan-ly-don-ve/quan-ly-don-ve';

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
            <Tab.Screen name="Đặt vé" component={QuanLyDatVe}
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
            <Tab.Screen name="Quản lý đơn vé" component={QuanLyDonVe} 
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name={'ticket-alt'} style={{ color: '#fff' }} size={20} />
                    ),
                    headerTitleAllowFontScaling: true,
                    tabBarLabel: "Quản lý đơn vé",
                    headerStyle: {
                        backgroundColor: '#40a9e7'
                    },
                    headerTintColor: '#ffffff',
                    tabBarInactiveTintColor: "#afafaf"
                }} />
            <Tab.Screen name="Tìm vé" component={TimKiemThongTinVe}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name={'search'} style={{ color: '#fff' }} size={20} />
                    ),
                    headerTitleAllowFontScaling: true,
                    tabBarLabel: "Tìm vé",
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
