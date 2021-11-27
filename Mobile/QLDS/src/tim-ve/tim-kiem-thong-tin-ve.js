import React, { useEffect, useState } from "react";
import { Text, View, Button, ImageBackground, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { timVeService } from "../services/TimVeService";

export default function TimKiemThongTinVe({ navigation }) {

    const [maVe, setMaVe] = useState("");
    const [cmnd, setCmnd] = useState("");
    const [soDT, setSoDT] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onSearchVe = () => {
        if(!maVe || !cmnd || !soDT){
            setErrorMessage("Vui lòng nhập thông tin");
            return;
        }

        var model ={
            "SoVe": maVe,
            "CMND": cmnd,
            "SoDT": soDT
        }

        timVeService.onTimVe(model).then(function(res){
            if(!res.data.Status){
                setErrorMessage(res.data.Message);
                return;
            }
            var veTimDuocTemp = res.data.Data;
            navigation.navigate("Thông tin vé", {veTimDuocTemp})
        }).catch(function(error){
            setErrorMessage("Lỗi kết nối")
        })
    }

    useEffect(() => {
        setErrorMessage("");
    }, [maVe, cmnd, soDT])

    return (
        <View style={search.wpDatVeTau}>
            {/* <View style={{ marginBottom: 10 }}>
                <ImageBackground source={require('../../images/bg-tracuu.jpg')}
                    style={search.imageBg}>
                </ImageBackground>
            </View> */}
            <View>
                <View style={search.searchViewDate}>
                    <View>
                        <Text style={search.textNgay}>Mã số vé</Text>
                    </View>
                    <View>
                        <TextInput
                            value={maVe}
                            style={search.textChonNgay}
                            placeholder="Mã số khi đặt vé"
                            onChangeText={setMaVe}
                        />
                    </View>
                </View>
                <View style={search.searchViewDate}>
                    <View>
                        <Text style={search.textNgay}>CMND/CCCD</Text>
                    </View>
                    <View>
                        <TextInput
                            value={cmnd}
                            style={search.textChonNgay}
                            placeholder="CMND/CCCD khi đặt vé"
                            onChangeText={setCmnd}
                        />
                    </View>
                </View>
                <View style={search.searchViewDate}>
                    <View>
                        <Text style={search.textNgay}>Số điện thoại</Text>
                    </View>
                    <View>
                        <TextInput
                            value={soDT}
                            style={search.textChonNgay}
                            placeholder="Số điện thoại khi đặt vé"
                            onChangeText={setSoDT}
                        />
                    </View>
                </View>
                {
                    errorMessage ? (<Text style={search.errorMessage}>
                        {errorMessage}
                    </Text>) : <></>
                }

                <View>
                    <Button
                        title="Tìm kiếm"
                        onPress={() => onSearchVe()}
                    />
                </View>
            </View>

        </View>
    )
}


var search = StyleSheet.create({
    wpDatVeTau: {
        padding: 10,
        backgroundColor: "#fff",
        height: "100%"
    },
    imageBg: {
        width: '100%', height: 150, resizeMode: 'cover'
    },
    searchViewDate: {
        backgroundColor: "#f5f6fa",
        marginBottom: 10,
        flexDirection: "column",
        borderWidth: 2,
        borderColor: "#b2bec3",
        borderRadius: 6,
    },
    wp_GaDi: {
        flex: 1,
        paddingLeft: 10,
        borderRightWidth: 1,
        borderRightColor: "#b2bec3"
    },
    wp_GaDen: {
        flex: 1,
        paddingRight: 10,
        borderLeftWidth: 1,
        borderLeftColor: "#b2bec3"
    },
    textGa: {
        paddingTop: 5,
        color: "#8395a7"
    },
    textChonGa: {
        fontSize: 18,
        color: "#222f3e",
        fontWeight: "bold"
    },
    flexEnd: {
        alignItems: 'flex-end'
    },
    textNgay: {
        paddingLeft: 10,
        paddingTop: 5,
        color: "#8395a7",
        fontSize: 13
    },
    textChonNgay: {
        padding: 10,
        fontSize: 15,
        color: "#222f3e",
    },
    errorMessage: {
        color: "#ff0d0d",
        marginBottom: 10,
        fontSize: 14
    }
});