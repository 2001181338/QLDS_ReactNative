import React, { useEffect, useState } from "react";
import { Text, View, Button, ImageBackground, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { timChuyenTauService } from "../services/TimChuyenTauService";

export default function QuanLyDatVe({ navigation }) {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [gaDiParent, setGaDiParent] = useState({});
    const [gaDenParent, setGaDenParent] = useState({});
    const [isGaDi, setIsGaDi] = useState(true);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const onChonGaParent = (ga, isGaDiTemp) => {
        if (isGaDiTemp) {
            setGaDiParent(ga);
        }
        else {
            setGaDenParent(ga);
        }
    }

    const onReDirect = (isGaDiParent) => {
        navigation.navigate('Chọn ga', { onChonGaParent, gaDiParent, gaDenParent, isGaDiParent })
    }

    const onTimChuyenTau = () => {
        if (!gaDiParent.MaGa || !gaDenParent.MaGa) {
            Alert.alert("Thông báo", "Vui lòng chọn ga đi và ga đến");
            return;
        }

        var model = {
            "MaGaDi": gaDiParent.MaGa,
            "MaGaDen": gaDenParent.MaGa,
            "NgayKhoiHanh": date
        }
        timChuyenTauService.onTimChuyenTau(model).then(function (res) {
            if (res.data.Status) {
                var chuyenTaus = res.data.Data;
                navigation.navigate('Danh sách chuyến tàu', { chuyenTaus })
            }
            else {
                Alert.alert("Thông báo", res.data.Message)
            }

        }).catch(function (error) {
            alert("error")
        })
    }

    return (
        <View style={search.wpDatVeTau}>
            <View style={search.bgChuyenTau}>
                <ImageBackground source={require('../../images/bg-timkiem.jpg')}
                    style={search.imageBg}>
                </ImageBackground>
            </View>
            <View style={search.searchView}>
                <View style={search.wp_GaDi}>
                    <View>
                        <Text style={search.textGa}>Ga đi</Text>
                    </View>
                    <TouchableOpacity onPress={() => onReDirect(true)}>
                        <View>
                            <Text style={search.textChonGa}>
                                {gaDiParent.MaGa ? gaDiParent.TenGa : "Chọn ga đi"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={search.wp_GaDen}>
                    <View style={search.flexEnd}>
                        <Text style={search.textGa}>Ga đến</Text>
                    </View>
                    <TouchableOpacity onPress={() => onReDirect(false)}>
                        <View style={search.flexEnd}>
                            <Text style={search.textChonGa}>
                                {gaDenParent.MaGa ? gaDenParent.TenGa : "Chọn ga đến"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={search.searchViewDate}>
                <View>
                    <Text style={search.textNgay}>Ngày khởi hành
                    </Text>

                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 16 }}>{moment(date).format("DD/MM/YYYY")}</Text>
                </View>
                <TouchableOpacity onPress={showDatepicker}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={search.textChonNgay}>Chọn ngày khởi hành</Text>
                        {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
                <Button
                    title="Tìm chuyến tàu"
                    onPress={() => onTimChuyenTau()}
                />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}


var search = StyleSheet.create({
    bgChuyenTau:{
        height: 300
    },  
    wpDatVeTau: {
        backgroundColor: '#dcdde1', height: '100%'
    },
    imageBg: {
        width: '100%',
        height: '100%',
        resizeMode: "cover"
    },
    searchView: {
        backgroundColor: "#f5f6fa",
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "#b2bec3",
        borderRadius: 6,
    },
    searchViewDate: {
        backgroundColor: "#f5f6fa",
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
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
        paddingTop: 20,
        paddingBottom: 20,
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
        color: "#8395a7"
    },
    textChonNgay: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 18,
        color: "#222f3e",
        fontWeight: "bold",

    }
});