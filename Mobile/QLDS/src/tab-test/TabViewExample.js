import * as React from 'react';
import { View, Text } from 'react-native';
import { Tab, TabView } from 'react-native-elements';
import { useEffect } from 'react';

export default function TabViewExample() {
    const [index, setIndex] = React.useState(0);

    return (
        <View>
            <Tab value={index} onChange={setIndex}>
                <Tab.Item title="recent" />
                <Tab.Item title="favorite" />
                <Tab.Item title="cart" />
            </Tab>
            {/* <TabView value={index} onChange={setIndex}>
                <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                    <Text>Recent</Text>
                </TabView.Item>
            </TabView> */}
            <TabView.Item key={0} style={{ backgroundColor: 'red', width: '100%' }}>
                <Text>Recent</Text>
            </TabView.Item>
            <TabView.Item key={1} style={{ backgroundColor: 'blue', width: '100%' }}>
                <Text>Favorite</Text>
            </TabView.Item>
            <TabView.Item key={2} style={{ backgroundColor: 'green', width: '100%' }}>
                <Text>Cart</Text>
            </TabView.Item>
        </View>
    );
}

