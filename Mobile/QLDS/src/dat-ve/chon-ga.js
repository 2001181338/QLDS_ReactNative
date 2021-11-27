import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacityBase, TouchableOpacity, LogBox } from "react-native";
import { gaService } from "../services/GaService";



export default function ChonGaDi({ navigation, route }) {

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const [danhSachGa, setdanhSachGa] = useState([]);
    const [gaDi, setGaDi] = useState({})
    const [gaDen, setGaDen] = useState({})
    const [isGaDi, setIsGaDi] = useState(true);

    var { onChonGaParent, gaDiParent, gaDenParent, isGaDiParent } = route.params;

    useEffect(() => {
        gaService.getAllGa().then(function (res) {
            if (res.data.Status) {
                setdanhSachGa(res.data.Data);
            }
        }).catch(function (error) {
            alert("error")
        })


        setGaDi(gaDiParent);
        setGaDen(gaDenParent);
        setIsGaDi(isGaDiParent);
    }, [])

    const renderDanhSachGa = () => {
        return danhSachGa.map((ga, index) => {
            return (<TouchableOpacity style={styles.wp_DanhSachGa} key={index} onPress={() => { onChonGa(ga) }}>
                <View style={styles.contentDSGa} key={index}>
                    <View style={styles.viewID}>
                        <Text style={styles.textID}>{ga.KyHieu}</Text>
                    </View>
                    <View style={styles.viewName}>
                        <Text style={styles.textName}>{ga.TenGa}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            )
        })
    }

    const onChonGa = (ga) => {
        if (isGaDi) {
            setGaDi(ga);
            setIsGaDi(false);
            onChonGaParent(ga, true)
        }
        else {
            setGaDen(ga);
            setIsGaDi(true);
            onChonGaParent(ga, false)
        }

    }

    const onSelectToChonGa = (isGaDiTemp) => {
        setIsGaDi(isGaDiTemp)
    }

    return (
        <View>
            <View style={styles.searchView}>
                <View style={styles.wp_GaDi}>
                    <View>
                        <Text style={styles.textGaDi}>Ga đi</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={isGaDi ? styles.inputGaChon : styles.input}
                            onPress={() => {
                                onSelectToChonGa(true)
                            }}

                        >
                            <Text>
                                {gaDi.TenGa ? gaDi.TenGa : "Chọn ga đi"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.wp_GaDen}>
                    <View style={styles.flexEnd}>
                        <Text style={styles.textGaDen}>Ga đến</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={!isGaDi ? styles.inputGaChon : styles.input}
                            onPress={() => {
                                onSelectToChonGa(false)
                            }}
                        >
                            <Text>
                                {gaDen.TenGa ? gaDen.TenGa : "Chọn ga đến"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.bgColor_DanhSachGa}>
                {renderDanhSachGa()}
            </ScrollView>
        </View>
    )
}


var styles = StyleSheet.create({
    searchView: {
        backgroundColor: "#f5f6fa",
        flexDirection: "row",
        borderColor: "#b2bec3",
    },
    wp_GaDi: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#b2bec3"
    },
    wp_GaDen: {
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: "#b2bec3"
    },
    textGaDi: {
        paddingTop: 5,
        paddingLeft: 10,
        color: "#8395a7"
    },
    textGaDen: {
        paddingTop: 5,
        paddingRight: 10,
        color: "#8395a7"
    },
    textChonGa: {
        paddingTop: 20,
        paddingBottom: 20,
        color: "#222f3e",
    },
    flexEnd: {
        alignItems: 'flex-end'
    },
    input: {
        height: 60,
        borderBottomWidth: 4,
        borderBottomColor: '#f5f6fa',
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    inputGaChon: {
        height: 60,
        borderBottomWidth: 4,
        borderBottomColor: '#82ccdd',
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    bgColor_DanhSachGa: {
        backgroundColor: '#dcdde1',
        marginTop: 10,
        marginBottom: 80
    },
    wp_DanhSachGa: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10
    },
    contentDSGa: {
        flexDirection: "row",
        backgroundColor: "#f5f6fa",
        marginBottom: 10,
        height: 60
    },
    viewID: {
        alignItems: "center",
        justifyContent: "center",
        flex: 0.2,
        backgroundColor: '#82ccdd',
        padding: 5
    },
    textID: {
        color: '#2d3436',
        fontWeight: "bold",
        fontSize: 18
    },
    viewName: {
        flex: 0.8,
        padding: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    textName: {
        color: '#636e72',
        fontSize: 18
    }
});