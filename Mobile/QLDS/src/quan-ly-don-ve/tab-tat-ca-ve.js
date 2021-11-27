import moment from "moment";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from "react-native-elements"

export default function TabTatCaVe(props) {

    const [danhSachTatCaVeAll, setdanhSachTatCaVeAll] = useState([]);
    const [veDangChon, setVeDangChon] = useState({});

    useEffect(() => {
        if (props.danhSachVe) {
            // alert(JSON.stringify(props.danhSachVe))
            setdanhSachTatCaVeAll(props.danhSachVe)
        }
    }, [props.danhSachVe])

    const numberFormat = (value) => {

        return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const onThanhToanTraVe = (ve, isThanhToan) => {
        props.onRedirect(ve, isThanhToan)
    }

    const onShowXoaVe = (ve) => {
        var indexVe = danhSachTatCaVeAll.findIndex(x => x.SoVe == ve.SoVe);
        if (indexVe != -1) {
            danhSachTatCaVeAll[indexVe].isShowXoaVe = true;
            setdanhSachTatCaVeAll([...danhSachTatCaVeAll]);
        }
    }

    const onHuyXoaVe = (ve) => {
        var indexVe = danhSachTatCaVeAll.findIndex(x => x.SoVe == ve.SoVe);
        if (indexVe != -1) {
            danhSachTatCaVeAll[indexVe].isShowXoaVe = false;
            setdanhSachTatCaVeAll([...danhSachTatCaVeAll]);
        }
    }

    const renderDanhSachVe = () => {
        return danhSachTatCaVeAll.map((danhSachTatCaVe, index) => {
            return (<TouchableOpacity onLongPress={() => {
                onShowXoaVe(danhSachTatCaVe)
            }} key={index} onLo onPress={() => {
                if (danhSachTatCaVe.TrangThai != 4 && danhSachTatCaVe.TrangThai != 3) {
                    onThanhToanTraVe(danhSachTatCaVe, danhSachTatCaVe.TrangThai == 2 ? true : false)

                }
            }}>
                <View style={styles.dateBooking}>
                    <Text style={styles.colorGrey}>Ngày đặt vé: </Text>
                    <Text style={styles.fontWeightBold}>{moment(danhSachTatCaVe.NgayBanVe).format("DD/MM/YYYY")}</Text>
                </View>
                <View style={styles.bgWhite}>
                    <View style={styles.headingThongTinVe}>
                        <View>
                            <Text style={styles.textMaVe}>Mã số vé</Text>
                            <Text style={styles.mBottom5}>Loại vé</Text>
                            <Text>Trạng thái</Text>
                        </View>
                        <View style={styles.flexEnd}>
                            <Text style={styles.textDataMaVe}>{danhSachTatCaVe.SoVe}</Text>
                            <Text style={styles.mBottom5}>{danhSachTatCaVe.TrangThaiVe == 1 ? <Text>Cá nhân</Text> : <Text>Tập thể</Text>}</Text>
                            {danhSachTatCaVe.TrangThai == 1 ? <Text style={styles.colorDaThanhToan}>Đã thanh toán</Text>
                                : danhSachTatCaVe.TrangThai == 2 ? <Text style={styles.colorChuaThanhToan}>Chưa thanh toán</Text>
                                    : danhSachTatCaVe.TrangThai == 3 ? <Text style={styles.colorDaHuy}>Đã hủy</Text>
                                        : <Text style={styles.colorDaHoanThanh}>Đã hoàn thành</Text>}
                        </View>
                    </View>
                    <View style={styles.bodyThongTinVe}>
                        <View style={styles.wpNgayDi}>
                            <Text style={styles.colorGrey}>Ngày đi</Text>
                            <Text style={styles.colorGrey}>{moment(danhSachTatCaVe.NgayKhoiHanh).format("DD/MM/YYYY")}</Text>
                        </View>
                        <View style={styles.itemTrain}>
                            <View style={styles.divTrain}>
                                <Text style={styles.tenTau}>{danhSachTatCaVe.TenTau}</Text>
                                <FontAwesome5 name={'train'} style={styles.train} solid />
                            </View>
                            <View style={styles.thongTinChuyenTau}>
                                <Text style={styles.tenGa}>{danhSachTatCaVe.GaDi}</Text>
                                <View style={styles.gioKhoiHanh}>
                                    <Text style={styles.gio}>{danhSachTatCaVe.GioKhoiHanh}</Text>
                                    <Text style={styles.arrow}></Text>
                                </View>
                                <Text style={styles.tenGa}>{danhSachTatCaVe.GaDen}</Text>
                            </View>
                        </View>
                        <View style={styles.itemInfo}>
                            <View style={styles.wpTrainIcon}>
                                <FontAwesome5 name={'male'} style={styles.train} solid />
                            </View>
                            <View style={styles.wpThongTinKhach}>
                                <View>
                                    <Text style={styles.mBottom10}>{danhSachTatCaVe.HoTen}</Text>
                                    <Text style={styles.textBlur}>{danhSachTatCaVe.CMND}</Text>
                                    <Text>{danhSachTatCaVe.SoDT}</Text>
                                </View>
                                <View style={styles.flexEnd}>
                                    <Text style={styles.mBottom10}>Toa {danhSachTatCaVe.TenToa} Chỗ {danhSachTatCaVe.SoCho}</Text>
                                    <Text style={styles.textBlur}>{danhSachTatCaVe.LoaiVe}</Text>
                                    <Text style={styles.textGiaVe}>{numberFormat(danhSachTatCaVe.GiaVe)} VNĐ</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        {danhSachTatCaVe.TrangThai == 2 ?
                            <Text style={styles.textNote}>Vui lòng thanh toán vé trong vòng 12 giờ sau khi đặt</Text>
                            : <Text></Text>}
                    </View>
                </View>
                {
                    danhSachTatCaVe.isShowXoaVe ? (
                        <View>
                            <Button
                                buttonStyle={{
                                    backgroundColor: "#ff0d0d"
                                }}
                                title="Xóa vé"
                                onPress={() => {
                                    props.onXoaVe(danhSachTatCaVe)
                                }}
                            />
                            <Button
                                onPress={() => {
                                    onHuyXoaVe(danhSachTatCaVe)
                                }}
                                buttonStyle={{
                                    backgroundColor: "#44bd32"
                                }}
                                title="Hủy"
                            />
                        </View>
                    )
                        : <></>
                }

            </TouchableOpacity>)
        })
    }

    return (
        <ScrollView style={{ backgroundColor: "#dfe6e9" }}>
            {renderDanhSachVe()}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    dateBooking: {
        backgroundColor: "#c8d6e5",
        padding: 10,
        flexDirection: "row"
    },
    train: {
        fontSize: 70,
        color: "#4699e1"
    },
    itemTrain: {
        padding: 12,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#b2bec3"
    },
    itemInfo: {
        padding: 12,
        marginBottom: 5,
        flexDirection: 'row',
    },
    tenTau: {
        position: "absolute",
        top: 15,
        left: 10,
        color: "#000",
        fontWeight: "bold",
        fontSize: 13,
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
        width: 120,
        height: 4,
        backgroundColor: "#d1d1d1",
        margin: 5

    },
    gioKhoiHanh: {
        textAlign: "center",
        alignItems: "center"
    },
    tenGa: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    gio: {
        fontSize: 15,
        fontWeight: "bold"
    },
    flexEnd: {
        alignItems: 'flex-end'
    },
    fontWeightBold: {
        fontWeight: "bold"
    },
    colorGrey: {
        color: "#636e72"
    },
    bgWhite: {
        backgroundColor: "#fff"
    },
    headingThongTinVe: {
        padding: 5,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    bodyThongTinVe: {
        borderWidth: 1,
        borderColor: "#b2bec3",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        borderRadius: 6
    },
    textMaVe: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 16
    },
    textDataMaVe: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 16,
        color: "#000"
    },
    mBottom5: {
        marginBottom: 5
    },
    colorDaThanhToan: {
        color: "#44bd32"
    },
    colorChuaThanhToan: {
        color: "#ff3838"
    },
    colorDaHuy: {
        color: "#ff0d0d"
    },
    colorDaHoanThanh: {
        color: "#0652DD"
    },
    wpNgayDi: {
        borderBottomWidth: 1,
        borderColor: "#b2bec3",
        justifyContent: 'space-between',
        flexDirection: "row",
        padding: 5
    },
    wpTrainIcon: {
        flex: 0.2
    },
    wpThongTinKhach: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mBottom10: {
        marginBottom: 10
    },
    textBlur: {
        marginBottom: 10,
        color: "#636e72"
    },
    textGiaVe: {
        color: "#000",
        fontWeight: "bold"
    },
    textNote: {
        color: "#ff3838",
        padding: 10
    }
});