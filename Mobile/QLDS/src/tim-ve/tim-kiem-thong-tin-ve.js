import React from "react";
import { Text, View, Button, ImageBackground, StyleSheet, ScrollView, TextInput } from "react-native";

export default function TimKiemThongTinVe({ navigation }) {

    return (
        <View style={search.wpDatVeTau}>
            <View style={{ marginBottom: 10 }}>
                {/* <ImageBackground source={require('../../images/bg-tracuu.jpg')}
                    style={search.imageBg}>
                </ImageBackground> */}
            </View>
            <ScrollView>
                <View style={search.searchViewDate}>
                    <View>
                        <Text style={search.textNgay}>Mã số vé</Text>
                    </View>
                    <View>
                        <TextInput
                            style={search.textChonNgay}
                            placeholder="Mã số khi đặt vé"
                        />
                    </View>
                </View>
                <View style={search.searchViewDate}>
                    <View>
                        <Text style={search.textNgay}>CMND/CCCD</Text>
                    </View>
                    <View>
                        <TextInput
                            style={search.textChonNgay}
                            placeholder="CMND/CCCD khi đặt vé"
                        />
                    </View>
                </View>
                <View style={search.searchViewDate}>
                    <View>
                        <Text style={search.textNgay}>Số điện thoại</Text>
                    </View>
                    <View>
                        <TextInput
                            style={search.textChonNgay}
                            placeholder="Số điện thoại khi đặt vé"
                        />
                    </View>
                </View>
                <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
                    <Button
                        title="Tra cứu"
                        onPress={() => navigation.navigate('ThongTinVe')}
                    />
                </View>
            </ScrollView>

        </View>
    )
}


var search = StyleSheet.create({
    wpDatVeTau: {
        backgroundColor: '#dcdde1', height: '100%'
    },
    imageBg: {
        width: '100%', height: 150, resizeMode: 'cover'
    },
    searchViewDate: {
        backgroundColor: "#f5f6fa",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "column",
        borderWidth: 2,
        borderColor: "#b2bec3",
        borderRadius: 6,
    },
    wp_GaDi: {
        flex: 1,
        paddingLeft: 10,
        borderRightWidth: 1,
        borderRightColor: "#b2bec3"
    },
    wp_GaDen: {
        flex: 1,
        paddingRight: 10,
        borderLeftWidth: 1,
        borderLeftColor: "#b2bec3"
    },
    textGa: {
        paddingTop: 5,
        color: "#8395a7"
    },
    textChonGa: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 18,
        color: "#222f3e",
        fontWeight: "bold"
    },
    flexEnd: {
        alignItems: 'flex-end'
    },
    textNgay: {
        paddingLeft: 10,
        paddingTop: 5,
        color: "#8395a7"
    },
    textChonNgay: {
        padding: 10,
        fontSize: 18,
        color: "#222f3e",
        fontWeight: "bold",

    }
});