import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableOpacityBase, Alert, LogBox } from "react-native";
import { Button, CheckBox } from 'react-native-elements';

export default function ThongTinKhach({ route, navigation }) {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    const [tenKhachEdit, setTenKhachEdit] = useState("")
    const [soDienThoaiEdit, setSoDienThoaiEdit] = useState("")
    const [cmndEdit, setCmndEdit] = useState("")

    const { onEditKhach, thongTinKhach } = route.params;

    useEffect(() => {
        setTenKhachEdit(thongTinKhach.HoTen)
        setSoDienThoaiEdit(thongTinKhach.SoDT)
        setCmndEdit(thongTinKhach.CMND)
        // alert(onEditKhach)
    }, [])

    const onXacNhan = () => {
        if(!tenKhachEdit || !soDienThoaiEdit || !cmndEdit){
            Alert.alert("Thông báo", "Vui lòng nhập thông tin");
            return;
        }

        if(isNaN(soDienThoaiEdit) || isNaN(cmndEdit) || soDienThoaiEdit.length < 10 || soDienThoaiEdit.length > 12 || (cmndEdit.length != 9 && cmndEdit.length != 12)){
            Alert.alert("Thông báo", "Số điện thoại hoặc chứng minh thư không hợp lệ");
            return;
        }

        thongTinKhach.HoTen = tenKhachEdit;
        thongTinKhach.SoDT = soDienThoaiEdit;
        thongTinKhach.CMND = cmndEdit;

        onEditKhach(thongTinKhach);
        navigation.goBack(null);
    }

    return (
        <View style={styles.thongTinKhach}>
            <Text style={styles.tieuDe}>Thông tin khách đi tàu </Text>
            <Text style={styles.textTitle}>
                Họ tên
                <Text style={{ color: "#ff0d0d" }} > * </Text>
            </Text>
            <TextInput style={styles.input} value={tenKhachEdit} onChangeText={setTenKhachEdit} placeholder="Nhập họ tên" />

            <Text style={styles.textTitle}>
                Số điện thoại
                <Text style={{ color: "#ff0d0d" }} > * </Text>
            </Text>
            <TextInput style={styles.input} value={soDienThoaiEdit} onChangeText={setSoDienThoaiEdit} placeholder="Nhập số điện thoại" />

            <Text style={styles.textTitle}>
                CMND / CCCD
                <Text style={{ color: "#ff0d0d" }} > * </Text>
            </Text>
            <TextInput style={styles.input} value={cmndEdit} onChangeText={setCmndEdit} placeholder="Nhập CMND / CCCD" />

            <Text style={{height: 10}}></Text>
            <Button style={styles.xacNhan}
                onPress={() => { onXacNhan() }}
                title="Xác nhận"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    thongTinKhach: {
        padding: 10,
        position: "relative",
        height: "100%",
        backgroundColor: "#fff"
    },
    tieuDe: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 10
    },
    textTitle: {
        fontSize: 13,
        marginBottom: 5
    },
    input: {
        paddingVertical: 10,
        fontSize: 15,
        borderBottomColor: "#dbdbdb",
        borderBottomWidth: 1
    },
    xacNhan: {
        position: "absolute",
        bottom: 0,
        left: 0,
        marginTop: 10
    }
});