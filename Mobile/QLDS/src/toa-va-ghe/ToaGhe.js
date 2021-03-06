import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, TouchableOpacityBase, TouchableWithoutFeedback, FlatList, Alert, LogBox } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { localHost } from '../variable-contants/variable-contants';
import { toaGheService } from '../services/ToaGheService';

export default function ToaGhe({ navigation, route }) {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    const [danhSachToa, setDanhSachToa] = useState([])
    const [chuyenTau, setChuyenTau] = useState({})
    const [gheDay0, setGheDay0] = useState([])
    const [gheDay1, setGheDay1] = useState([])
    const [gheDay2, setGheDay2] = useState([])
    const [gheDay3, setGheDay3] = useState([])
    const [tongTien, setTongTien] = useState(0)

    const [danhSachGheChon, setDanhSachGheChon] = useState([])
    const [isThanhCong, setIsThanhCong] = useState(false);

    const { toas, chuyenTauTemp } = route.params;

    const selectedToa = (toa) => {
        var danhSachToaTemp = danhSachToa;
        danhSachToaTemp.forEach(x => x.IsSelected = false);
        var toaSelected = danhSachToaTemp.find(x => x.TenToa == toa.TenToa);
        if (!toa.IsSelected) {
            toaSelected.IsSelected = !toaSelected.IsSelected;

            var model = {
                "MaChuyenTau": chuyenTau.MaChuyenTau,
                "MaToa": toa.MaToa
            }

            // alert("model: " + model.MaChuyenTau)

            toaGheService.getGheByToa(model).then(function (res) {
                if (res.data.Status) {
                    setGheDay0(res.data.Data.GheDay0)
                    setGheDay1(res.data.Data.GheDay1)
                    setGheDay2(res.data.Data.GheDay2)
                    setGheDay3(res.data.Data.GheDay3)
                }
                else {
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
            danhSachGheChonTemp.push(ghe);
        }

        var tinhTongTien = 0;
        danhSachGheChonTemp.forEach(ghe => {
            tinhTongTien += ghe.GiaVe
        })
        setTongTien(tinhTongTien);
        setDanhSachGheChon([...danhSachGheChonTemp])
    }

    const renderDanhSachToa = () => {
        return danhSachToa.map((item, index) => {
            return (<TouchableOpacity onPress={() => {
                selectedToa(item)
            }} key={index} style={[item.IsSelected ? styles.toaSelected : (item.LoaiToa == 2 ? styles.toaNgoi : styles.toaNam)]}>
                <Text>
                    {item.TenToa}
                </Text>
            </TouchableOpacity>)
        })
    }

    useEffect(() => {
        setDanhSachToa(toas);
        setChuyenTau(chuyenTauTemp);
    }, [])

    const numberFormat = (value) => {
        return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const onTiepTucDatVe = () => {
        if (danhSachGheChon.length <= 0) {
            Alert.alert("Th??ng b??o", "Vui l??ng ch???n gh??? c???n ?????t");
            return;
        }

        navigation.navigate("Nh???p th??ng tin h??nh kh??ch", { danhSachGheChon, chuyenTau, onDatVeThanhCong });
    }

    const onDatVeThanhCong = (isDone) => {
        if (isDone) {
            gheDay0.forEach(ghe => {
                if (danhSachGheChon.findIndex(x => x.MaGhe == ghe.MaGhe) != -1) {
                    ghe.DaDat = true;
                }
            });
            gheDay1.forEach(ghe => {
                if (danhSachGheChon.findIndex(x => x.MaGhe == ghe.MaGhe) != -1) {
                    ghe.DaDat = true;
                }
            });
            gheDay2.forEach(ghe => {
                if (danhSachGheChon.findIndex(x => x.MaGhe == ghe.MaGhe) != -1) {
                    ghe.DaDat = true;
                }
            });
            gheDay3.forEach(ghe => {
                if (danhSachGheChon.findIndex(x => x.MaGhe == ghe.MaGhe) != -1) {
                    ghe.DaDat = true;
                }
            });

            setGheDay0([...gheDay0])
            setGheDay0([...gheDay1])
            setGheDay0([...gheDay2])
            setGheDay0([...gheDay3])

            setDanhSachGheChon([]);
            setTongTien(0);
        }
    }

    return (
        <View style={styles.toaVaGhe}>
            <View style={styles.title}>
                <FontAwesome5 name={'train'} style={styles.title_train} />
                <Text style={styles.tenChuyen}>
                    {chuyenTau.TenTau} | {chuyenTau.GaDi} - {chuyenTau.GaDen} {chuyenTau.GioKhoiHanh} - {chuyenTau.NgayKhoiHanh}
                </Text>
            </View>
            <View style={styles.divKyHieuToa}>
                <View style={styles.kyHieuLeft}>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_toaNgoi}></Text>
                        <Text style={styles.kyHieu_ten}>Toa ng????i</Text>
                    </View>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_bieuTuongChuaDat}></Text>
                        <Text style={styles.kyHieu_ten}>Ch??a ??????t</Text>
                    </View>
                </View>
                <View style={styles.kyHieuMiddle}>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_toaNam}></Text>
                        <Text style={styles.kyHieu_ten}>Toa n????m</Text>
                    </View>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_bieuTuongDangChon}></Text>
                        <Text style={styles.kyHieu_tenDangChon}>??ang ??????t</Text>
                    </View>
                </View>
                <View style={styles.kyHieuRight}>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_toaDangChon}></Text>
                        <Text style={styles.kyHieu_tenDangChon}>Toa cho??n</Text>
                    </View>
                    <View style={styles.divKyHieu_item}>
                        <Text style={styles.kyHieu_bieuTuongDaDat}></Text>
                        <Text style={styles.kyHieu_tenDaDat}>??a?? ??????t</Text>
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
                            renderDanhSachToa()
                        }
                    </ScrollView>
                </View>
                <View style={styles.ghe}>
                    <View style={styles.ghe_tenGhe}>
                        <Text>
                            Danh sa??ch gh????
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
            <View style={styles.bottomDatVe}>
                <View style={styles.tongGiaVe}>
                    <View >
                        <View>
                            <Text>
                                Ve?? ng????i: {chuyenTau.GiaVeNgoiStr} VN??
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Ve?? n????m: {chuyenTau.GiaVeNamStr} VN??
                            </Text>
                        </View>
                    </View>

                    <Text>T????ng ti????n: {numberFormat(tongTien)} VN?? </Text>
                </View>
                <TouchableOpacity style={styles.tiepTucDatVe} onPress={() => {
                    onTiepTucDatVe()
                }}>
                    <Text>
                        Ti????p tu??c
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    toaVaGhe: {
        position: "relative",
        height: "100%"
    },
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
        padding: 5,
        marginBottom: 280
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
        marginBottom: 0
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
        marginBottom: 0
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
    bottomDatVe: {
        position: "absolute",
        height: 100,
        width: "100%",
        bottom: 0,
        left: 0,
    },
    tongGiaVe: {
        backgroundColor: "#f6f6f6",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 13,
        borderColor: "#c1c1c1",
        borderWidth: 1,
        height: 60
    },
    tiepTucDatVe: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#9ed2ff",
        justifyContent: "center",
        height: 40
    }
})