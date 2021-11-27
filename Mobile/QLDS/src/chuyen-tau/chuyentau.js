import React, { useState, useEffect } from "react";
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, Button, LogBox } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ChuyenTau({ navigation, route }) {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    const [danhSachChuyenTau, setDanhSachChuyentau] = useState([])

    const chonChuyenTau = (chuyenTau) => {
        var toas = chuyenTau.Toas;
        var chuyenTauTemp = chuyenTau;
        // alert(chuyenTauTemp.MaChuyenTau)
        navigation.navigate("Toa và ghế", { toas, chuyenTauTemp })
    }

    const { chuyenTaus } = route.params;

    useEffect(() => {
        setDanhSachChuyentau(chuyenTaus);
    }, [])

    const renderChuyenTaus = () => {
        return danhSachChuyenTau.map((chuyenTau, index) => {
            return (
                <TouchableOpacity key={index} style={styles.itemTrain} onPress={() => {
                    chonChuyenTau(chuyenTau)
                }}>
                    <View style={styles.divTrain}>
                        <Text style={styles.tenTau}>{chuyenTau.TenTau}</Text>
                        <FontAwesome5 name={'train'} style={styles.train} solid />
                    </View>
                    <View style={styles.thongTinChuyenTau}>
                        <Text style={styles.tenGa}>{chuyenTau.GaDi}</Text>
                        <View style={styles.gioKhoiHanh}>
                            <Text>{chuyenTau.NgayKhoiHanh}</Text>
                            <Text style={styles.gio}>{chuyenTau.GioKhoiHanh}</Text>
                            <Text style={styles.arrow}></Text>
                            <Text style={styles.giaVe}>
                                Vé ngồi: {chuyenTau.GiaVeNgoiStr} VNĐ</Text>
                            <Text style={styles.giaVe}>Vé nằm:  {chuyenTau.GiaVeNamStr} VNĐ</Text>
                            {/* <Text>Message: {moment(date).format('DD/MM/yyyy')}</Text> */}
                        </View>
                        <Text style={styles.tenGa}>{chuyenTau.GaDen}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    return (
        <ScrollView>
            {renderChuyenTaus()}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    train: {
        fontSize: 90,
        color: "#4699e1"
    },
    itemTrain: {
        backgroundColor: "#fff",
        padding: 12,
        margin: 10,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: "center",
    },
    tenTau: {
        position: "absolute",
        top: 22,
        left: 16,
        color: "#000",
        fontWeight: "bold",
        fontSize: 15,
    },
    divTrain: {
        position: "relative",
    },
    thongTinChuyenTau: {
        padding: 12,
        textAlign: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    arrow: {
        width: 130,
        height: 4,
        backgroundColor: "#d1d1d1",
        margin: 5
    },
    gioKhoiHanh: {
        textAlign: "center",
        alignItems: "center"
    },
    tenGa: {
        fontSize: 13
    },
    gio: {
        fontSize: 15,
        fontWeight: "bold"
    },
    giaVe: {
        color: "#444444",
        fontSize: 13
    }
});

