import React from "react";
import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";



export default function ChonGaDen({ navigation }) {

    return (
        <View>
            <View style={styles.searchView}>
                <View style={styles.wp_GaDi}>
                    <View>
                        <Text style={styles.textGaDi}>Ga đi</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Chọn ga đi"
                        />
                    </View>
                </View>
                <View style={styles.wp_GaDen}>
                    <View style={styles.flexEnd}>
                        <Text style={styles.textGaDen}>Ga đến</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Chọn ga đến"
                        />
                    </View>
                </View>
            </View>
            <ScrollView style={styles.bgColor_DanhSachGa}>
                <View style={styles.wp_DanhSachGa}>
                    <View style={styles.contentDSGa}>
                        <View style={styles.viewID}>
                            <Text style={styles.textID}>21</Text>
                        </View>
                        <View style={styles.viewName}>
                            <Text style={styles.textName}>Hà Nội</Text>
                            <Text style={styles.textName}>21, Hà Nội, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={styles.contentDSGa}>
                        <View style={styles.viewID}>
                            <Text style={styles.textID}>21</Text>
                        </View>
                        <View style={styles.viewName}>
                            <Text style={styles.textName}>Hà Nội</Text>
                            <Text style={styles.textName}>21, Hà Nội, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={styles.contentDSGa}>
                        <View style={styles.viewID}>
                            <Text style={styles.textID}>21</Text>
                        </View>
                        <View style={styles.viewName}>
                            <Text style={styles.textName}>Hà Nội</Text>
                            <Text style={styles.textName}>21, Hà Nội, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={styles.contentDSGa}>
                        <View style={styles.viewID}>
                            <Text style={styles.textID}>21</Text>
                        </View>
                        <View style={styles.viewName}>
                            <Text style={styles.textName}>Hà Nội</Text>
                            <Text style={styles.textName}>21, Hà Nội, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={styles.contentDSGa}>
                        <View style={styles.viewID}>
                            <Text style={styles.textID}>21</Text>
                        </View>
                        <View style={styles.viewName}>
                            <Text style={styles.textName}>Hà Nội</Text>
                            <Text style={styles.textName}>21, Hà Nội, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={styles.contentDSGa}>
                        <View style={styles.viewID}>
                            <Text style={styles.textID}>21</Text>
                        </View>
                        <View style={styles.viewName}>
                            <Text style={styles.textName}>Hà Nội</Text>
                            <Text style={styles.textName}>21, Hà Nội, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={styles.contentDSGa}>
                        <View style={styles.viewID}>
                            <Text style={styles.textID}>21</Text>
                        </View>
                        <View style={styles.viewName}>
                            <Text style={styles.textName}>Hà Nội</Text>
                            <Text style={styles.textName}>21, Hà Nội, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={styles.contentDSGa}>
                        <View style={styles.viewID}>
                            <Text style={styles.textID}>21</Text>
                        </View>
                        <View style={styles.viewName}>
                            <Text style={styles.textName}>Hà Nội</Text>
                            <Text style={styles.textName}>21, Hà Nội, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={styles.contentDSGa}>
                        <View style={styles.viewID}>
                            <Text style={styles.textID}>21</Text>
                        </View>
                        <View style={styles.viewName}>
                            <Text style={styles.textName}>Hà Nội</Text>
                            <Text style={styles.textName}>21, Hà Nội, Hà Nội</Text>
                        </View>
                    </View>
                </View>
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
        borderBottomColor: '#303030',
        padding: 10,
    },
    bgColor_DanhSachGa: {
        backgroundColor: '#dcdde1',
        height: '100%'
    },
    wp_DanhSachGa:{
        marginTop: 20, 
        marginLeft: 10, 
        marginRight: 10
    },
    contentDSGa:{
        flexDirection: "row", 
        backgroundColor: "#f5f6fa", 
        marginBottom: 10
    },
    viewID:{
        alignItems: "center", 
        justifyContent: "center", 
        flex: 0.2, 
        backgroundColor: '#82ccdd', 
        padding: 5
    },
    textID:{
        color: '#2d3436', 
        fontWeight: "bold", 
        fontSize: 18
    },
    viewName:{
        flex: 0.8, 
        padding: 5
    },
    textName:{
        color: '#636e72', 
        fontSize: 18
    }
});