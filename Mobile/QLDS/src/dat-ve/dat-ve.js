import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuanLyDatVe from './quan-ly-dat-ve';
import ChonGa from './chon-ga';

const Stack = createNativeStackNavigator();

export function DatVe() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Đặt vé"
                component={QuanLyDatVe}
                options={{ title: 'Đặt vé' }}
            />
            <Stack.Screen name="Chọn ga" component={ChonGa} />
        </Stack.Navigator>
    );
};