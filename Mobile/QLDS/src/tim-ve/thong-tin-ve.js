import moment from "moment";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ThongTinVe({ navigation, route }) {


    const [veTimDuoc, setVeTimDuoc] = useState({});

    const { veTimDuocTemp } = route.params;

    const numberFormat = (value) => {
        return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    useEffect(() => {
        setVeTimDuoc(veTimDuocTemp)
    }, [])

    const onChangeTrangThai = (trangThai) => {
        veTimDuoc.TrangThaiVe = trangThai;
        setVeTimDuoc({ ...veTimDuoc })
    }

    const onThanhToanTrucTuyen = (isThanhToan) => {
        var maVe = veTimDuocTemp.SoVe;
        var cmndTemp = veTimDuoc.CMND;
        navigation.navigate("Thanh toán trực tuyến", { maVe, isThanhToan, onChangeTrangThai, cmndTemp });
    }



    return (
        <ScrollView style={styles.wrapper}>
            <View style={styles.wp_ThongTinVe}>
                <View style={styles.wp_TuyenDuong}>
                    <Text style={styles.textTuyenDuong}>{veTimDuoc.GaDi} </Text>
                    <FontAwesome5 name={'long-arrow-alt-right'} style={{ color: '#fff' }} size={20} />
                    <Text style={styles.textTuyenDuong}> {veTimDuoc.GaDen} - {moment(veTimDuoc.NgayKhoiHanh).format("DD/MM/yyyy")} - {veTimDuoc.GioKhoiHanh}</Text>
                </View>
                <View style={styles.dongThongTinVe}>
                    <View style={styles.cotThongTinTrai}>
                        <View>
                            <Text style={styles.textLabelTrai}>Họ tên khách hàng</Text>
                        </View>
                        <View style={styles.plr_10}>
                            <Text style={styles.textBinding}>{veTimDuoc.HoTen}</Text>
                        </View>
                    </View>
                    <View style={styles.cotThongTinPhai}>
                        <View style={styles.flexEnd}>
                            <Text style={styles.textLabelPhai}>Tên tàu</Text>
                        </View>
                        <View style={styles.textRight}>
                            <Text style={styles.textBinding}>{veTimDuoc.TenTau}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dongThongTinVe}>
                    <View style={styles.cotThongTinTrai}>
                        <View>
                            <Text style={styles.textLabelTrai}>CMND / CCCD</Text>
                        </View>
                        <View style={styles.plr_10}>
                            <Text style={styles.textBinding}>{veTimDuoc.CMND}</Text>
                        </View>
                    </View>
                    <View style={styles.cotThongTinPhai}>
                        <View style={styles.flexEnd}>
                            <Text style={styles.textLabelPhai}>Thông tin ghế</Text>
                        </View>
                        <View style={styles.textRight}>
                            <Text style={styles.textBinding}>{veTimDuoc.TenGhe}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dongThongTinVe}>
                    <View style={styles.cotThongTinTrai}>
                        <View>
                            <Text style={styles.textLabelTrai}>Số điện thoại</Text>
                        </View>
                        <View style={styles.plr_10}>
                            <Text style={styles.textBinding}>{veTimDuoc.SoDT}</Text>
                        </View>
                    </View>
                    <View style={styles.cotThongTinPhai}>
                        <View style={styles.flexEnd}>
                            <Text style={styles.textLabelPhai}>Loại chỗ</Text>
                        </View>
                        <View style={styles.textRight}>
                            <Text style={styles.textBinding}>{veTimDuoc.LoaiVe}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dongThongTinVe}>
                    <View style={styles.cotThongTinTrai}>
                        <View>
                            <Text style={styles.textLabelTrai}>Thành tiền</Text>
                        </View>
                        <View style={styles.plr_10}>
                            <Text style={styles.textBinding}>{veTimDuoc.GiaVe ? numberFormat(veTimDuoc.GiaVe) : 0} VNĐ</Text>
                        </View>
                    </View>
                    <View style={styles.cotThongTinPhai}>
                        <View style={styles.flexEnd}>
                            <Text style={styles.textLabelPhai}>Trạng thái vé</Text>
                        </View>
                        <View style={styles.textRight}>
                            <View style={styles.textBinding}>
                                {veTimDuoc.TrangThaiVe == 1 ? <Button onPress={() => {
                                    onThanhToanTrucTuyen(false)
                                }} title="Trả vé" />
                                    : (veTimDuoc.TrangThaiVe == 2 ? <Button onPress={() => {
                                        onThanhToanTrucTuyen(true)
                                    }} buttonStyle={{
                                        backgroundColor: "#30a755"
                                    }} title="Thanh toán" />
                                        : (veTimDuoc.TrangThaiVe == 3 ? <Text style={{ color: "#ff0d0d" }}>Đã hủy</Text>
                                            : <Text style={{ color: "#30a755" }}>Đã hoàn thành</Text>))
                                }</View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.wp_QuyDinh}>
                <View style={styles.headingQuyDinh}>
                    <Text style={styles.textHeadingQuyDinh}>Quy định đổi, trả vé</Text>
                </View>
                <View style={styles.contentQuyDinh}>
                    <Text style={styles.textContentQuyDinh}>- Đổi vé: Vé cá nhân đổi trước giờ tàu chạy 24 giờ trở lên, lệ phí là 20.000 đồng/vé; không áp dụng đổi vé đối với vé tập thể.</Text>
                    <Text style={styles.textContentQuyDinh}>- Trả vé:</Text>
                    <Text style={styles.textContentQuyDinh}>  + Vé cá nhân: Trả vé trước giờ tàu chạy từ 4 giờ đến dưới 48 giờ, lệ phí là 20% giá vé; từ 48 giờ trở lên lệ phí là 10% giá vé.</Text>
                    <Text style={styles.textContentQuyDinh}>  + Vé tập thể: Trả vé trước giờ tàu chạy từ 24 giờ đến dưới 72 giờ, lệ phí là 30% giá vé; từ 72 giờ trở lên lệ phí là 20% giá vé.</Text>
                </View>
            </View>
        </ScrollView>

    )
}


var styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        height: '100%'
    },
    wp_ThongTinVe: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: '#b2bec3',
        borderRadius: 6
    },
    wp_TuyenDuong: {
        flexDirection: "row",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#f66',
        backgroundColor: '#f66',
        padding: 10
    },
    textTuyenDuong: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15
    },
    plr_10: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    wp_QuyDinh: {
        margin: 10,
        borderWidth: 2,
        borderColor: '#b2bec3',
        borderRadius: 6
    },
    headingQuyDinh: {
        backgroundColor: '#f66',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#f66',
    },
    textHeadingQuyDinh: {
        color: '#fff',
        fontSize: 15,
        fontWeight: "bold"
    },
    contentQuyDinh: {
        padding: 10,
        backgroundColor: "#f5f6fa"
    },
    textContentQuyDinh: {
        color: '#2f3542',
        fontSize: 15
    },
    dongThongTinVe: {
        backgroundColor: "#f5f6fa",
        flexDirection: "row",
        borderColor: "#b2bec3",
        borderBottomWidth: 2,
    },
    cotThongTinTrai: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#b2bec3",
        padding: 5
    },
    cotThongTinPhai: {
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: "#b2bec3",
        padding: 5
    },
    textLabelTrai: {
        paddingTop: 5,
        paddingLeft: 10,
        color: "#8395a7"
    },
    textLabelPhai: {
        paddingTop: 5,
        paddingRight: 10,
        color: "#8395a7",
    },
    textBinding: {
        paddingTop: 10,
        paddingBottom: 10,
        color: "#222f3e",
        fontSize: 18,
        fontWeight: "bold"
    },
    flexEnd: {
        alignItems: 'flex-end'
    },
    textRight: {
        alignItems: "flex-end",
        marginHorizontal: 10
    },
    btnThanhToan: {
        marginTop: 10,
        paddingHorizontal: 10
    }
});