import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Alert, LogBox } from 'react-native';
import { Button } from 'react-native-elements';
import { datVeService } from '../services/DatVeService';

export default function ThanhToan({ navigation, route }) {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const [cmnd, setCmnd] = useState("")
    const [maBaoMat, setMaBaoMat] = useState("")
    const [isError, setIsError] = useState(false)
    const [messageError, setMessageError] = useState("");
    const [maVeTemp, setMaVeTemp] = useState(0);
    const [isThanhToanTemp, setIsThanhToanTemp] = useState(false);

    const { maVe, isThanhToan, onChangeTrangThai, cmndTemp, ve } = route.params;

    const onXacNhan = () => {
        if (!cmnd || !maBaoMat) {
            setIsError(true);
            setMessageError("Vui lòng nhập thông tin")
            return;
        }
        var model = {
            "MaVe": maVeTemp,
            "CMND": cmnd,
            "MaBaoMat": maBaoMat
        }

        if (isThanhToanTemp) {
            datVeService.onThanhToan(model).then(function (res) {
                if (!res.data.Status) {
                    setIsError(true);
                    setMessageError(res.data.Message);
                    return;
                }
                if (ve) {
                    onChangeTrangThai(1, ve)
                }
                else {
                    onChangeTrangThai(1);
                    AsyncStorageLib.setItem("IsChangeVe", "True")
                }
                Alert.alert("Thông báo", res.data.Message);
                navigation.goBack(null);

            }).catch(function (erro) {
                Alert.alert("Thông báo", "Lỗi đăng nhập");
            })
        }
        else {
            datVeService.onTraVe(model).then(function (res) {
                if (!res.data.Status) {
                    setIsError(true);
                    setMessageError(res.data.Message);
                    return;
                }

                if (ve) {
                    onChangeTrangThai(3, ve)
                }
                else {
                    onChangeTrangThai(3);
                    AsyncStorageLib.setItem("IsChangeVe", "True")
                }
                Alert.alert("Thông báo", res.data.Message);
                navigation.goBack(null);

            }).catch(function (erro) {
                Alert.alert("Thông báo", "Lỗi đăng nhập");
            })
        }

    }


    useEffect(() => {
        setIsError(false);
    }, [cmnd, maBaoMat])

    useEffect(() => {
        setMaVeTemp(maVe)
        setIsThanhToanTemp(isThanhToan)
        if (!isThanhToan) {
            setCmnd(cmndTemp)
        }
        else {
            setCmnd("");
        }
    }, [])

    return (
        <View>
            <View style={styles.thongTinKhach}>
                <Text style={styles.tieuDe}>Số vé: {maVeTemp} </Text>
                <Text style={styles.textTitle}>
                    CMND / CCCD
                    <Text style={{ color: "#ff0d0d" }} > * </Text>
                </Text>
                <TextInput editable={isThanhToan} value={cmnd} onChangeText={setCmnd} style={styles.input} placeholder="CMND / CCCD" />

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
                {
                    isThanhToan ? <Button onPress={() => {
                        onXacNhan()
                    }} buttonStyle={{
                        backgroundColor: "#30a755"
                    }} title="Thanh toán" />
                        :
                        <Button onPress={() => {
                            onXacNhan()
                        }} title="Trả vé" />
                }
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