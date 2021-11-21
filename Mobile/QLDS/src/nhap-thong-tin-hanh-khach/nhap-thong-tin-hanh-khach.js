import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function NhapThongTinHanhKhach() {
    return (
        <View>
            <View style={styles.thongTinKhach} >
                <Text style={styles.tieuDe}> Thông tin khách đi tàu </Text>
                <View style={styles.item} >
                    <View style={styles.thongTinKhach_khachHang} >
                        <View style={styles.thongTinKhach_left} >
                            <FontAwesome5 name={'user-alt'} size={60} color={"#2caef9"} />
                            <View>
                                <Text style={styles.thongTinKhach_value} >
                                    Họ tên
                                    <Text style={{ color: "#ff0d0d" }} > * </Text>
                                </Text>
                                <Text style={styles.thongTinKhach_value}>
                                    Số điện thoại
                                    <Text style={{ color: "#ff0d0d" }} > * </Text>
                                </Text>
                                <Text style={styles.thongTinKhach_value} >
                                    CMND / CCCD
                                    <Text style={{ color: "#ff0d0d" }} > *</Text>
                                </Text>
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
                                    <Text style={styles.thongTinCho_so} > 1 </Text>
                                </View>
                                <View style={styles.thongTinCho_value} >
                                    <Text style={styles.thongTinCho_toa} > Chỗ </Text>
                                    <Text style={styles.thongTinCho_so} > 15 </Text>
                                </View>
                            </View> 
                            <View style={styles.itemThongTinCho_thongTinChuyenTau} >
                                <Text style={styles.itemThongTinCho_chuyenTau} > Đi TCBL1 06: 00 26 / 11 </Text>
                                <Text style={styles.itemThongTinCho_chuyenTau} > Sài Gòn - Hà Nội </Text>
                            </View>
                        </View>
                        <Text style={styles.itemThongTinCho_giaTien}>
                            990.000 đ
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    thongTinKhach: {
        backgroundColor: "#fff",
        padding: 10
    },
    item: {
        borderColor: "#dbdbdb",
        borderWidth: 1,
        padding: 12,
        borderRadius: 10
    },
    tieuDe: {
        fontSize: 17,
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
        fontSize: 15
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
        alignItems: "center"
    },
    thongTinCho_toa: {
        fontSize: 14,
        color: "#8b8b8b",
    },
    thongTinCho_so: {
        fontSize: 17,
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
        fontSize: 15
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
    }
})