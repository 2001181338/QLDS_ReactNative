import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ThongTinVe({ navigation }) {


    const [veTimDuoc, setVeTimDuoc] = useState({
        "GaDi" : "Sài Gòn",
        "GaDen" : "Dĩ An",
        "NgayKhoiHanh" : "20/11/2021",
        "GioKhoiHanh" : "7:00",
        "HoTen" : "Phạm Mỹ Kha",
        "CMND" : "272845512",
        "TenTau" : "SGDA1",
        "TenToa" : "01",
        "TenGhe" : "001",
        "LoaiVe" : "Giường nằm",
        "GiaVe" : 120000,
        "TrangThaiVe" : "Đã thanh toán"
    });


    return (
        <ScrollView style={styles.wrapper}>
            <View style={styles.wp_ThongTinVe}>
                <View style={styles.wp_TuyenDuong}>
                    <Text style={styles.textTuyenDuong}>{veTimDuoc.GaDi} </Text>
                    <FontAwesome5 name={'long-arrow-alt-right'} style={{ color: '#0652DD' }} size={20} />
                    <Text style={styles.textTuyenDuong}> {veTimDuoc.GaDen} - {veTimDuoc.NgayKhoiHanh} - {veTimDuoc.GioKhoiHanh}</Text>
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
                            <Text style={styles.textLabelPhai}>CMND/CCCD</Text>
                        </View>
                        <View style={styles.plr_10}>
                            <Text style={styles.textBinding}>{veTimDuoc.CMND}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dongThongTinVe}>
                    <View style={styles.cotThongTinTrai}>
                        <View>
                            <Text style={styles.textLabelTrai}>Tên tàu</Text>
                        </View>
                        <View style={styles.plr_10}>
                            <Text style={styles.textBinding}>{veTimDuoc.TenTau}</Text>
                        </View>
                    </View>
                    <View style={styles.cotThongTinPhai}>
                        <View style={styles.flexEnd}>
                            <Text style={styles.textLabelPhai}>Tên toa</Text>
                        </View>
                        <View style={styles.plr_10}>
                            <Text style={styles.textBinding}>Toa: {veTimDuoc.TenToa}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dongThongTinVe}>
                    <View style={styles.cotThongTinTrai}>
                        <View>
                            <Text style={styles.textLabelTrai}>Thông tin chỗ</Text>
                        </View>
                        <View style={styles.plr_10}>
                            <Text style={styles.textBinding}>Chỗ số: {veTimDuoc.TenGhe}</Text>
                        </View>
                    </View>
                    <View style={styles.cotThongTinPhai}>
                        <View style={styles.flexEnd}>
                            <Text style={styles.textLabelPhai}>Loại chỗ</Text>
                        </View>
                        <View style={styles.plr_10}>
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
                            <Text style={styles.textBinding}>{veTimDuoc.GiaVe} VNĐ</Text>
                        </View>
                    </View>
                    <View style={styles.cotThongTinPhai}>
                        <View style={styles.flexEnd}>
                            <Text style={styles.textLabelPhai}>Trạng thái vé</Text>
                        </View>
                        <View style={styles.plr_10}>
                            <Text style={styles.textBinding}>{veTimDuoc.TrangThaiVe}</Text>
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
        backgroundColor: '#dcdde1',
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
        borderColor: '#b2bec3',
        backgroundColor: '#63cdda',
        padding: 10
    },
    textTuyenDuong: {
        fontWeight: 'bold',
        color: '#0652DD',
        fontSize: 16
    },
    plr_10: {
        paddingLeft: 10,
        paddingRight: 10
    },
    wp_QuyDinh: {
        margin: 10,
        borderWidth: 2,
        borderColor: '#b2bec3',
        borderRadius: 6
    },
    headingQuyDinh: {
        backgroundColor: '#dd5600',
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#b2bec3'
    },
    textHeadingQuyDinh: {
        color: '#fff',
        fontSize: 16
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
        color: "#8395a7"
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
});