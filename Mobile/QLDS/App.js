import React from 'react';
import TabNavigation from './src/tab-navigation/tab-navigation';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuanLyDatVe from './src/dat-ve/quan-ly-dat-ve';
import ChonGa from './src/dat-ve/chon-ga';
import ChonGaDi from './src/dat-ve/chon-ga-di';
import ChuyenTau from './src/chuyen-tau/chuyentau';
import ToaGhe from './src/toa-va-ghe/ToaGhe';
import NhapThongTinHanhKhach from './src/nhap-thong-tin-hanh-khach/nhap-thong-tin-hanh-khach';
import ThongTinKhach from './src/thong-tin-khach/thong-tin-khach';
import NganHang from './src/ngan-hang/ngan-hang';
import ThongTinVe from './src/tim-ve/thong-tin-ve';
import ThanhToan from './src/thanh-toan/thanh-toan';
import QuanLyDonVe from './src/quan-ly-don-ve/quan-ly-don-ve';
import TabTatCaVe from './src/quan-ly-don-ve/tab-tat-ca-ve';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="QuanLyDatVe" component={QuanLyDatVe} />
        <Stack.Screen name="Chọn ga" component={ChonGa} />
        <Stack.Screen name="ChonGaDi" component={ChonGaDi} />
        <Stack.Screen name="Danh sách chuyến tàu" component={ChuyenTau} />
        <Stack.Screen name="Toa và ghế" component={ToaGhe} />
        <Stack.Screen name="Nhập thông tin hành khách" component={NhapThongTinHanhKhach} />
        <Stack.Screen name="Nhập thông tin khách" component={ThongTinKhach} />
        <Stack.Screen name="Thông tin ngân hàng" component={NganHang} />
        <Stack.Screen name="Thông tin vé" component={ThongTinVe} />
        <Stack.Screen name="Thanh toán trực tuyến" component={ThanhToan} />
        <Stack.Screen name="Tab tất cả vé" component={TabTatCaVe} />
        <Stack.Screen
          name="Quản lý đơn vé"
          component={QuanLyDonVe}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

function Home() {
  return (
    <TabNavigation></TabNavigation>
  );
}

