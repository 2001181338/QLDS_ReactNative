import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { veService } from "../services/VeService";
import TabTatCaVe from "./tab-tat-ca-ve";

export default function QuanLyDonVe({ navigation }) {

    const [index, setIndex] = useState(0)

    const [danhSachTatCaVe, setdanhSachTatCaVe] = useState([]);
    const [danhSachVeChuaThanhToan, setDanhSachVeChuaThanhToan] = useState([]);
    const [danhSachVeDaThanhToan, setDanhSachVeDaThanhToan] = useState([]);
    const [isChangeStored, setIsChangeStored] = useState(false);
    const [soVes, setSoVes] = useState([]);
    const [veDuocChon, setVeDuocChon] = useState({});
    useEffect(() => {
        var model = {
            "SoVes": soVes
        }
        veService.onGetDanhSachVe(model).then(function (res) {
            setdanhSachTatCaVe(res.data.Data);
        }).catch(function (error) {
            alert("Loi");
        })

    }, [soVes])

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', e => {
            AsyncStorageLib.getItem("SoVes", (error, res) => {
                if (res && soVes && res != soVes.join(",")) {
                    setSoVes(res.split(","))
                }
            })

            AsyncStorageLib.getItem("IsChangeVe", (errorChangeVe, resChangeVe) => {
                if (resChangeVe == "True") {
                    AsyncStorageLib.getItem("SoVes", (error, res) => {
                        if (res) {
                            setSoVes(res.split(","))
                            AsyncStorageLib.setItem("IsChangeVe", "False");
                        }
                    })
                }
            })
        });

        return unsubscribe;
    }, [navigation])

    const onRedirect = (ve, isThanhToan) => {
        var maVe = ve.SoVe;
        var cmndTemp = ve.CMND;
        navigation.navigate("Thanh toán trực tuyến", { maVe, isThanhToan, onChangeTrangThai, cmndTemp, ve });
    }

    const onChangeTrangThai = (trangThai, ve) => {
        var indexVe = danhSachTatCaVe.findIndex(x => x.SoVe == ve.SoVe);
        if (indexVe != -1) {
            danhSachTatCaVe[indexVe].TrangThai = trangThai;
            setdanhSachTatCaVe([...danhSachTatCaVe]);
        }
    }

    const onXoaVe = (ve) => {
        var indexVe = soVes.findIndex(x =>x == ve.SoVe);
        if(indexVe != -1){
            soVes.splice(indexVe, 1);
            var soVesMoi = soVes.join(",");
            AsyncStorageLib.setItem("SoVes", soVesMoi);
            setSoVes([...soVes]);
        }
    }

    useEffect(() => {
        var lstVeChuaThanhToan = danhSachTatCaVe.filter(x => x.TrangThai == 2);
        var lstVeDaThanhToan = danhSachTatCaVe.filter(x => x.TrangThai == 1);

        setDanhSachVeChuaThanhToan([...lstVeChuaThanhToan]);
        setDanhSachVeDaThanhToan([...lstVeDaThanhToan]);
    }, [danhSachTatCaVe])

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.wpTabs}>
                <TouchableOpacity onPress={() => setIndex(0)} style={index == 0 ? styles.activeTouch1 : styles.touchable1}>
                    <Text style={styles.textTabs}>Tất cả vé</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIndex(1)} style={index == 1 ? styles.activeTouch1 : styles.touchable1}>
                    <Text style={styles.textTabs}>Vé chưa thanh toán</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIndex(2)} style={index == 2 ? styles.activeTouch2 : styles.touchable2}>
                    <Text style={styles.textTabs}>Vé đã thanh toán</Text>
                </TouchableOpacity>
            </View>
            {
                index == 0 ? <TabTatCaVe danhSachVe={danhSachTatCaVe} onRedirect={onRedirect} onXoaVe={onXoaVe}/>
                    : (index == 1 ? <TabTatCaVe onRedirect={onRedirect} danhSachVe={danhSachVeChuaThanhToan} onXoaVe={onXoaVe}/>
                        : <TabTatCaVe onRedirect={onRedirect} danhSachVe={danhSachVeDaThanhToan} onXoaVe={onXoaVe}/>)
            }
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#dfe6e9"
    },
    wpTabs: {
        flexDirection: 'row',
        backgroundColor: "#dff9fb"
    },
    touchable1: {
        borderRightWidth: 1,
        borderColor: "#b2bec3",
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 10,
        paddingTop: 10,
    },
    touchable2: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 10,
        paddingTop: 10,
    },
    activeTouch1: {
        borderRightWidth: 1,
        borderColor: "#b2bec3",
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#0abde3",
    },
    activeTouch2: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#0abde3",
    },
    textTabs: {
        fontWeight: 'bold',
        color: "#000",
    }
});