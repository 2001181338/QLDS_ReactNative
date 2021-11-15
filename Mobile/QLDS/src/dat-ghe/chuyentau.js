import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, ScrollView, Button } from "react-native";
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { localHost } from "../variable-contants/variable-contants";
import axios from 'axios';
import moment from 'moment';



export default function DatGhe({ navigation }) {

    const [danhSachGhe, setDanhSachGhe] = useState([]);
    const [message, setMessage] = useState("")
    const [maGa, setMaGa] = useState(2);

    const getDanhSachGhe = async () => {
        var model = {
            "MaToa": 111,
            "MaChuyenTau": 1
        }
        try {
            fetch(localHost +'/api/ga/get-all')
                .then((response) => response.json())
                .then((json) => {
                    var ga = json.Data[0].MaGa;
                    alert("Data: " + ga)
                    return json;
                })
                .catch((error) => {
                    alert("error: " + error)
                    console.error(error);
                });
        }
        catch (error) {
            // console.log(error)
        }
    }

    const chonChuyenTau = (abc) => {
        setMessage(abc)
    }

    return (
        <ScrollView>
            <TouchableOpacity style={styles.itemTrain} onPress={() => {
                chonChuyenTau("ABcdf")
            }}>
                <View style={styles.divTrain}>
                    <Text style={styles.tenTau}>SGDA1</Text>
                    <FontAwesome5 name={'train'} style={styles.train} solid />
                </View>
                <View style={styles.thongTinChuyenTau}>
                    <Text style={styles.tenGa}>Sài Gòn</Text>
                    <View style={styles.gioKhoiHanh}>
                        <Text>01/01/2021</Text>
                        <Text style={styles.gio}>17:00 {maGa}</Text>
                        <Text style={styles.arrow}></Text>
                        <Text style={styles.giaVe}>Vé ngồi: 150.000 VNĐ</Text>
                        <Text style={styles.giaVe}>Vé nằm: 170.000 VNĐ</Text>
                        {/* <Text>Message: {moment(date).format('DD/MM/yyyy')}</Text> */}
                    </View>
                    <Text style={styles.tenGa}>Đà Nẵng</Text>
                </View>
            </TouchableOpacity>

            <Button title="Get DS" onPress={() => {
                getDanhSachGhe();
            }}></Button>
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
        fontSize: 15
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

