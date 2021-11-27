import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Alert, LogBox } from 'react-native';
import { Button } from 'react-native-elements';
import { nganHangService } from '../services/NganHangService';

export default function NganHang({ navigation, route }) {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const [cmnd, setCmnd] = useState("")
    const [maBaoMat, setMaBaoMat] = useState("")
    const [isError, setIsError] = useState(false)
    const [messageError, setMessageError] = useState("");

    const onXacNhan = () => {
        if (!cmnd || !maBaoMat) {
            setIsError(true);
            setMessageError("Vui lòng nhập thông tin")
            return;
        }
        var model = {
            "CMND": cmnd,
            "MaBaoMat": maBaoMat
        }

        nganHangService.onDangNhap(model).then(function (res) {
            if (!res.data.Status) {
                setIsError(true);
                setMessageError(res.data.Message);
                onNhapThongTinXacThuc(false, model)
                return;
            }

            Alert.alert("Thông báo", "Xác thực thành công");
            onNhapThongTinXacThuc(true, model)
            navigation.goBack(null);

        }).catch(function (erro) {
            Alert.alert("Thông báo", "Lỗi đăng nhập");
        })
    }

    const { onNhapThongTinXacThuc } = route.params;

    useEffect(() => {
        setIsError(false);
    }, [cmnd, maBaoMat])

    return (
        <View>
            <View style={styles.thongTinKhach}>
                <Text style={styles.tieuDe}>Thông tin  </Text>
                <Text style={styles.textTitle}>
                    CMND / CCCD
                    <Text style={{ color: "#ff0d0d" }} > * </Text>
                </Text>
                <TextInput value={cmnd} onChangeText={setCmnd} style={styles.input} placeholder="CMND / CCCD" />

                <Text style={styles.textTitle}>
                    Mã bảo mật
                    <Text style={{ color: "#ff0d0d" }} > * </Text>
                </Text>
                <TextInput value={maBaoMat} onChangeText={setMaBaoMat} style={styles.input} placeholder="Mã bảo mật" secureTextEntry={true} />
                {
                    isError ? (<Text style={styles.messageError}>
                        {messageError}
                    </Text>) : (<Text style={styles.messageError}>

                    </Text>)
                }
                <Button style={styles.xacNhan}
                    onPress={() => { onXacNhan() }}
                    title="Xác nhận"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageBg: {
        width: '100%',
        height: 150,
        resizeMode: "cover"
    },
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
        fontSize: 17,
        borderBottomColor: "#dbdbdb",
        borderBottomWidth: 1
    },
    xacNhan: {
        position: "absolute",
        bottom: 0,
        left: 0
    },
    messageError: {
        color: "#ff0d0d",
        paddingVertical: 10
    }
});