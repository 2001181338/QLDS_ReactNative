import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, LogBox } from 'react-native';
import { Button, CheckBox } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { datVeService } from '../services/DatVeService';

export default function NhapThongTinHanhKhach({ navigation, route }) {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const [thongTinKhach, setThongTinKhach] = useState({
        "HoTen": "",
        "SoDT": "",
        "CMND": ""
    })

    const [thongTinVeDat, setThongTinVeDat] = useState([])

    const [taiKhoan, setTaiKhoan] = useState({});
    const [isVeCaNhan, setIsVeCaNhan] = useState(true)
    const [isPhuongThucTrucTiep, setIsPhuongThucTrucTiep] = useState(true)
    const [chuyenTauTemp, setChuyenTauTemp] = useState({})

    const { danhSachGheChon, chuyenTau, onDatVeThanhCong } = route.params;

    const onEditKhach = (ve) => {
        var veEdit = thongTinVeDat.find(x => x.MaGhe === ve.MaGhe);
        if (veEdit) {
            setThongTinVeDat([...thongTinVeDat])
        }
    }

    const editThongTinKhach = (ve) => {
        var thongTinKhach = ve;
        navigation.navigate("Nhập thông tin khách", { onEditKhach, thongTinKhach })
    }

    const onChangeLoaiVe = (isCaNhan) => {
        if (!isCaNhan) {
            if (danhSachGheChon.length <= 5) {
                Alert.alert("Thông báo", "Chỉ áp dụng với tổng số vé lớn hơn 5");
                return;
            }
        }
        setIsVeCaNhan(isCaNhan)
    }

    const onNhapThongTinXacThuc = (isXacNhan, taiKhoanNganHang) => {
        if (!isXacNhan) {
            setIsPhuongThucTrucTiep(true);
        }
        else {
            setIsPhuongThucTrucTiep(false);
            setTaiKhoan(taiKhoanNganHang);
        }
    }

    const onChangePhuongThuc = (isTrucTiep) => {
        if (!isTrucTiep) {
            navigation.navigate("Thông tin ngân hàng", { onNhapThongTinXacThuc })
            return;
        }
        setIsPhuongThucTrucTiep(isTrucTiep)
    }

    const numberFormat = (value) => {
        return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    useEffect(() => {
        danhSachGheChon.forEach(ve => {
            ve.HoTen = "";
            ve.SoDT = "";
            ve.CMND = "";
            ve.isSameData = false;
        });
        setThongTinVeDat(danhSachGheChon)
        setChuyenTauTemp(chuyenTau);
    }, [])

    const onTheSameDate = (ve, index) => {
        ve.isSameData = !ve.isSameData;

        var veEdit = thongTinVeDat.find(x => x.MaGhe === ve.MaGhe);
        if (ve.isSameData) {
            var veTren = thongTinVeDat[index - 1];
            veEdit.HoTen = veTren.HoTen;
            veEdit.SoDT = veTren.SoDT;
            veEdit.CMND = veTren.CMND;
        }
        else {
            veEdit.HoTen = "";
            veEdit.SoDT = "";
            veEdit.CMND = "";
        }
        if (veEdit) {
            // alert(JSON.stringify(thongTinVeDat))
            setThongTinVeDat([...thongTinVeDat])
        }
    }

    const renderThongTinKhach = () => {
        return thongTinVeDat.map((ve, index) => {
            return (
                <TouchableOpacity key={index} style={styles.item} onPress={() => {
                    editThongTinKhach(ve);
                }}>
                    {
                        index != 0 ? (
                            <CheckBox
                                style={styles.checBox_item}
                                title='Giống thông tin trên'
                                checked={ve.isSameData}
                                onPress={() => { onTheSameDate(ve, index) }}
                            />
                        ) :
                            (
                                <></>
                            )
                    }

                    <View style={styles.thongTinKhach_khachHang} >
                        <View style={styles.thongTinKhach_left} >
                            <FontAwesome5 name={'user-alt'} size={60} color={"#2caef9"} />
                            <View>
                                {
                                    ve.HoTen ? (<Text style={styles.thongTinKhach_value} >
                                        {ve.HoTen}
                                    </Text>)
                                        :
                                        (
                                            <Text style={styles.thongTinKhach_value} >
                                                Họ tên
                                                <Text style={{ color: "#ff0d0d" }} > * </Text>
                                            </Text>
                                        )
                                }
                                {
                                    ve.SoDT ? (<Text style={styles.thongTinKhach_value} >
                                        {ve.SoDT}
                                    </Text>)
                                        :
                                        (
                                            <Text style={styles.thongTinKhach_value} >
                                                Số điện thoại
                                                <Text style={{ color: "#ff0d0d" }} > * </Text>
                                            </Text>
                                        )
                                }
                                {
                                    ve.CMND ? (<Text style={styles.thongTinKhach_value} >
                                        {ve.CMND}
                                    </Text>)
                                        :
                                        (
                                            <Text style={styles.thongTinKhach_value} >
                                                CMND / CCCD
                                                <Text style={{ color: "#ff0d0d" }} > * </Text>
                                            </Text>
                                        )
                                }
                            </View>
                        </View>

                        <View style={styles.arrow}>
                            <FontAwesome5 name={'arrow-right'} size={25} mcolor={"#dbdbdb"} />
                        </View>
                    </View>
                    <View style={styles.itemThongTinCho} >
                        <View style={styles.itemThongTinCho_left} >
                            <View style={styles.thongTinCho} >
                                <View style={styles.thongTinCho_value} >
                                    <Text style={styles.thongTinCho_toa} > Toa </Text>
                                    <Text style={styles.thongTinCho_so} > {ve.TenToa} </Text>
                                </View>
                                <View style={styles.thongTinCho_value} >
                                    <Text style={styles.thongTinCho_toa} > Chỗ </Text>
                                    <Text style={styles.thongTinCho_so} > {ve.SoCho} </Text>
                                </View>
                            </View>
                            <View style={styles.itemThongTinCho_thongTinChuyenTau} >
                                <Text style={styles.itemThongTinCho_chuyenTau} > Đi {chuyenTauTemp.TenTau} {chuyenTauTemp.GioKhoiHanh} {chuyenTauTemp.NgayKhoiHanh} </Text>
                                <Text style={styles.itemThongTinCho_chuyenTau} > {chuyenTauTemp.GaDi} - {chuyenTauTemp.GaDen} </Text>
                            </View>
                        </View>
                        <Text style={styles.itemThongTinCho_giaTien}>
                            {numberFormat(ve.GiaVe)} đ
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    const onXacNhanDatVe = () => {
        //Check fillup value info customer
        var isError = false;
        danhSachGheChon.forEach(ve => {
            if (!ve.HoTen || !ve.CMND || !ve.SoDT) {
                Alert.alert("Thông báo", "Vui lòng nhập thông tin khách hàng");
                isError = true;
                return;
            }
        });

        if (isError) return;

        var model = {
            "MaChuyenTau": chuyenTauTemp.MaChuyenTau,
            "LoaiVe": isVeCaNhan ? 1 : 2,
            "IsTrucTiep": isPhuongThucTrucTiep,
            "CMND": taiKhoan.CMND,
            "MaBaoMat": taiKhoan.MaBaoMat,
            "KhachHangGheModel": danhSachGheChon
        }

        datVeService.onDatVe(model).then(function (res) {
            if (!res.data.Status) {
                Alert.alert("Thông báo", res.data.Message);
                return;
            }

            var listMaVe = [];
            res.data.Data.forEach(ve => {
                listMaVe.push(ve.MaVe);
            });

            AsyncStorageLib.getItem("SoVes", (error, resTemp) => {
                var soVesTemp = "";
                if (resTemp) {
                    soVesTemp = resTemp + "," + listMaVe.join(",");
                }
                else {
                    soVesTemp = listMaVe.join(",");
                }

                Alert.alert("Thông báo", res.data.Message);
                onDatVeThanhCong(true);
                AsyncStorageLib.setItem("SoVes", soVesTemp);
            })

        }).catch(function (error) {
            Alert.alert("Thông báo", "Lỗi");
        })
    }

    return (
        <ScrollView>
            <View style={styles.tt_item} >
                <Text style={styles.tieuDe}> Thông tin khách đi tàu </Text>
                {renderThongTinKhach()}
            </View>
            <View style={styles.tt_item}>
                <Text style={styles.tieuDe}>Loại vé</Text>
                <View style={styles.checkBox}>
                    <CheckBox
                        style={styles.checBox_item}
                        title='Vé cá nhân'
                        checked={isVeCaNhan}
                        onPress={() => { onChangeLoaiVe(true) }}
                    />
                    <CheckBox
                        style={styles.checBox_item}
                        title='Vé tập thể'
                        checked={!isVeCaNhan}
                        onPress={() => { onChangeLoaiVe(false) }}
                    />
                </View>
                <Text style={styles.ghiChu}>
                    Ghi chú: Vé tập thể chỉ áp dụng với tổng số lượng vé lớn hơn 5
                </Text>
            </View>
            <View style={styles.tt_item}>
                <Text style={styles.tieuDe}>Phương thức thanh toán</Text>
                <View>
                    <CheckBox
                        style={styles.checBox_item}
                        title='Thanh toán trực tiếp tại quầy'
                        checked={isPhuongThucTrucTiep}
                        onPress={() => { onChangePhuongThuc(true) }}
                    />
                    <CheckBox
                        style={styles.checBox_item}
                        title='Ngân hàng Techcombank đã liên kết với hệ thống'
                        checked={!isPhuongThucTrucTiep}
                        onPress={() => { onChangePhuongThuc(false) }}
                    />
                </View>
            </View>
            <View style={styles.tt_item}>
                <Button style={styles.xacNhan}
                    onPress={() => { onXacNhanDatVe() }}
                    title="Xác nhận đặt vé"
                />
            </View>

        </ScrollView>
    )

}

const styles = StyleSheet.create({
    tt_item: {
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 10
    },
    item: {
        borderColor: "#dbdbdb",
        borderWidth: 1,
        padding: 12,
        borderRadius: 10,
        marginBottom: 10
    },
    tieuDe: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10
    },
    thongTinKhach_khachHang: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#dbdbdb",
        paddingBottom: 10,
        justifyContent: "space-between"
    },
    thongTinKhach_left: {
        flexDirection: "row",
        alignItems: "center",
    },
    thongTinKhach_value: {
        marginLeft: 15,
        paddingVertical: 4,
        fontSize: 14
    },
    thongTinCho: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 60
    },
    thongTinCho_value: {
        backgroundColor: "#caecff",
        padding: 3,
        alignItems: "center",
        fontSize: 14
    },
    thongTinCho_toa: {
        fontSize: 14,
        color: "#8b8b8b",
    },
    thongTinCho_so: {
        fontSize: 14,
    },
    itemThongTinCho: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        justifyContent: "space-between"

    },
    itemThongTinCho_thongTinChuyenTau: {
        marginLeft: 15,
    },
    itemThongTinCho_chuyenTau: {
        fontSize: 14
    },
    arrow: {
        alignItems: "flex-end",
        textAlign: "right"
    },
    itemThongTinCho_left: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemThongTinCho_giaTien: {
        color: "#9b9b9b"
    },
    checkBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    taiKhoanNganHang: {
        padding: 10
    },
    ghiChu: {
        color: "#000",
        fontStyle: "italic",
        fontSize: 13,
        paddingVertical: 10
    },
    taiKhoan: {
        fontSize: 13
    },
    xacNhan: {
        marginHorizontal: 10
    }
})