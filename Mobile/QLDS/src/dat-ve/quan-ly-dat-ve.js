import React from "react";
import { Text, View, Button } from "react-native";
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function QuanLyDatVe({ navigation }) {
    return (
        <View>
            <Text>Đặt vé</Text>
            <IconAntDesign name="stepbackward" size={50}></IconAntDesign>
            <FontAwesome5 name={'comments'} solid />
            <Button
                title="Go to Jane's profile"
                onPress={() =>
                    navigation.navigate('ChonGa')
                }
            />
        </View>
    )
}

  