import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, TouchableOpacityBase, TouchableWithoutFeedback } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { localHost } from '../variable-contants/variable-contants';
import { toaGheService } from '../services/ToaGheService';

export default function ToaGhe() {

    const [maChuyenTau, setMaChuyenTau] = useState(4)
    const [selected, setSelected] = useState(false)
    const [danhSachToa, setDanhSachToa] = useState([
        {
            "TenToa": "A",
            "IsSelected": false,
            "LoaiToa": 1,
            "MaToa": 111
        },
        {
            "TenToa": "B",
            "IsSelected": false,
            "LoaiToa": 1,
            "MaToa": 112
        },
        {
            "TenToa": "C",
            "IsSelected": false,
            "LoaiToa": 1
        },
        {
            "TenToa": "D",
            "IsSelected": false,
            "LoaiToa": 1
        },
        {
            "TenToa": "F",
            "IsSelected": false,
            "LoaiToa": 2
        },
        {
            "TenToa": "G",
            "IsSelected": false,
            "LoaiToa": 2
        },
        {
            "TenToa": "H",
            "IsSelected": false,
            "LoaiToa": 2
        },
        {
            "TenToa": "M",
            "IsSelected": false,
            "LoaiToa": 2
        },
        {
            "TenToa": "L",
            "IsSelected": false,
            "LoaiToa": 2
        }
    ])
    const [gheDay0, setGheDay0] = useState([])
    const [gheDay1, setGheDay1] = useState([])
    const [gheDay2, setGheDay2] = useState([])
    const [gheDay3, setGheDay3] = useState([])

    const [danhSachGheChon, setDanhSachGheChon] = useState([])

    const selectedToa = (toa) => {
        var danhSachToaTemp = danhSachToa;
        danhSachToaTemp.forEach(x => x.IsSelected = false);
        var toaSelected = danhSachToaTemp.find(x => x.TenToa == toa.TenToa);
        if (!toa.IsSelected) {
            toaSelected.IsSelected = !toaSelected.IsSelected;

            var model = {
                "MaChuyenTau": maChuyenTau,
                "MaToa": toa.MaToa
            }
         
            toaGheService.getGheByToa(model).then(function (res) {
                if(res.data.Status){
                    setGheDay0(res.data.Data.GheDay0)
                    setGheDay1(res.data.Data.GheDay1)
                    setGheDay2(res.data.Data.GheDay2)
                    setGheDay3(res.data.Data.GheDay3)
                }
                else{
                    alert(res.data.Message)
                }
               
            }).catch(function (error) {
                alert("error: " + error);
            })
            setDanhSachToa([...danhSachToaTemp])
        }
    }

    const renderDsGheDay = (danhSachGhe) => {
        return danhSachGhe.map((ghe, index) => {
            return (ghe.DaDat ? (<TouchableOpacity key={index} style={styles.gheDaDat} disabled>
                <Text>
                    {ghe.TenGhe}
                </Text>
            </TouchableOpacity>)
                : (danhSachGheChon.findIndex(x => x.MaGhe == ghe.MaGhe) != -1 ?
                    (<TouchableOpacity key={index} style={styles.gheDaChon} onPress={() => {
                        onSelecetedGhe(ghe)
                    }}>
                        <Text>
                            {ghe.TenGhe}
                        </Text>
                    </TouchableOpacity>)
                    :
                    (<TouchableOpacity key={index} style={styles.gheChuaDat} onPress={() => {
                        onSelecetedGhe(ghe)
                    }}>
                        <Text>
                            {ghe.TenGhe}
                        </Text>
                    </TouchableOpacity>)
                )
            )
        })
    }

    const onSelecetedGhe = (ghe) => {
        var danhSachGheChonTemp = danhSachGheChon;
        var indexGheSelected = danhSachGheChonTemp.findIndex(x => x.MaGhe == ghe.MaGhe);
        if (indexGheSelected != -1) {
            danhSachGheChonTemp = danhSachGheChonTemp.filter(x => x.MaGhe !== ghe.MaGhe);
        }
        else {
            danhSachGheChon.push(ghe);
        }
        setDanhSachGheChon([...danhSachGheChonTemp])
    }

    const getDanhSachGheByToa = function (model) {
        axios.post(localHost + '/api/toa/get-ghe-by-toa', model).then(function (res) {
            alert("success")
        }).catch(function (error) {
            alert("error: " + error);
        })
    }

    useEffect(() => {

    }, [])

    return (
        <View>
            <View style={styles.title}>
                <FontAwesome5 name={'train'} style={styles.title_train} />
                <Text style={styles.tenChuyen}>
                    SGDA1
                    |
                    Sài Gòn - Đà Nẵng
                    17:00
                    -
                    01/01/2021
                </Text>
            </View>
            <View style={styles.divKyHieuToa}>
                <View style={styles.kyHieuLeft}>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_toaNgoi}></Text>
                        <Text style={styles.kyHieu_ten}>Toa ngồi</Text>
                    </View>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_bieuTuongChuaDat}></Text>
                        <Text style={styles.kyHieu_ten}>Chưa đặt</Text>
                    </View>
                </View>
                <View style={styles.kyHieuMiddle}>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_toaNam}></Text>
                        <Text style={styles.kyHieu_ten}>Toa nằm</Text>
                    </View>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_bieuTuongDangChon}></Text>
                        <Text style={styles.kyHieu_tenDangChon}>Đang đặt</Text>
                    </View>
                </View>
                <View style={styles.kyHieuRight}>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_toaDangChon}></Text>
                        <Text style={styles.kyHieu_tenDangChon}>Toa chọn</Text>
                    </View>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_bieuTuongDaDat}></Text>
                        <Text style={styles.kyHieu_tenDaDat}>Đã đặt</Text>
                    </View>
                </View>

            </View>
            <View style={styles.toaGhe}>
                <View style={styles.toa}>
                    <View style={styles.toa_tenToa}>
                        <Text>
                            Toa
                        </Text>
                    </View>
                    <ScrollView style={styles.danhSachToa} showsVerticalScrollIndicator={false}>
                        {
                            danhSachToa.map((item, index) => {
                                return (<TouchableOpacity onPress={() => {
                                    selectedToa(item)
                                }} key={index} style={[item.IsSelected ? styles.toaSelected : (item.LoaiToa == 2 ? styles.toaNgoi : styles.toaNam)]}>
                                    <Text>
                                        {item.TenToa}
                                    </Text>
                                </TouchableOpacity>)
                            })
                        }
                    </ScrollView>
                </View>
                <View style={styles.ghe}>
                    <View style={styles.ghe_tenGhe}>
                        <Text>
                            Danh sách ghế
                        </Text>
                    </View>
                    <ScrollView style={styles.scrollDanhSachGhe}>
                        <View style={styles.divGhe}>
                            <View>
                                {renderDsGheDay(gheDay0)}
                            </View>
                            <View>
                                {renderDsGheDay(gheDay1)}
                            </View>
                            <View>
                            </View>
                            <View>
                            </View>
                            <View>
                                {renderDsGheDay(gheDay2)}
                            </View>
                            <View>
                                {renderDsGheDay(gheDay3)}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <View>
                <Text>Ghe</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    title: {
        padding: 7,
        backgroundColor: "#066eab",
        flexDirection: "row",
        alignItems: "center"
    },
    title_train: {
        fontSize: 35,
        color: "#fff"
    },
    tenChuyen: {
        marginLeft: 15,
        marginRight: 15,
        fontSize: 13,
        color: "#fff",
    },
    toaGhe: {
        flexDirection: "row",
        padding: 5
    },
    toa_tenToa: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        backgroundColor: "#9ed2ff",
        color: "#fff",
    },
    ghe: {
        flex: 6
    },
    toa: {
        flex: 1,
        paddingRight: 5
    },
    ghe_tenGhe: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#c1c1c1",
        borderWidth: 1,
        height: 50,
    },
    toaItem: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 70,
        backgroundColor: "#d9d9d9",
        color: "#fff",
        marginTop: 10
    },
    toaSelected: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 70,
        color: "#fff",
        marginTop: 10,
        backgroundColor: "#9ed2ff",
        borderRadius: 10
    },
    toaNgoi: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 70,
        color: "#fff",
        marginTop: 10,
        backgroundColor: "#c1c1c1",
        borderRadius: 10
    },
    toaNam: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 70,
        color: "#fff",
        marginTop: 10,
        backgroundColor: "#fdd4d4",
        borderRadius: 10
    },
    danhSachToa: {
        marginBottom: 360
    },
    divGhe: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    divGhe_item: {
        width: 50,
        height: 50,
        borderColor: "#c1c1c1",
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 10
    },
    divDayGhe: {
    },
    gheChuaDat: {
        width: 50,
        height: 50,
        borderColor: "#c1c1c1",
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 10
    },
    gheDaDat: {
        width: 50,
        height: 50,
        borderColor: "#ff3535",
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#ff3535",
        color: "#fff"
    },
    gheDaChon: {
        width: 50,
        height: 50,
        borderColor: "#22ef90",
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#22ef90",
        color: "#fff"
    },
    line: {
        width: 50,
        height: 10,
        backgroundColor: "#22ef90",
        color: "#fff"
    },
    lineNormal: {
        backgroundColor: "#000"
    },
    scrollDanhSachGhe: {
        marginBottom: 360
    },
    divKyHieu: {
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    divKyHieu_item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 7
    },
    kyHieu_bieuTuongChuaDat: {
        width: 20,
        height: 20,
        borderColor: "#c1c1c1",
        borderWidth: 1,
        marginRight: 5
    },
    kyHieu_bieuTuongDangChon: {
        width: 20,
        height: 20,
        backgroundColor: "#22ef90",
        borderColor: "#22ef90",
        borderWidth: 1,
        marginRight: 5
    },
    kyHieu_bieuTuongDaDat: {
        width: 20,
        height: 20,
        backgroundColor: "#ff3535",
        borderColor: "#ff3535",
        borderWidth: 1,
        marginRight: 5
    },
    divKyHieuToa: {
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    kyHieu_toaNgoi: {
        width: 20,
        height: 20,
        backgroundColor: "#c1c1c1",
        borderColor: "#c1c1c1",
        borderWidth: 1,
        marginRight: 5
    },
    kyHieu_toaNam: {
        width: 20,
        height: 20,
        backgroundColor: "#fdd4d4",
        borderColor: "#fdd4d4",
        borderWidth: 1,
        marginRight: 5
    },
    kyHieu_toaDangChon: {
        width: 20,
        height: 20,
        backgroundColor: "#9ed2ff",
        borderColor: "#9ed2ff",
        borderWidth: 1,
        marginRight: 5
    },
})