import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function HomeScreen(props) {

    const _gotoStorageScreen = () => {
        props.navigation.navigate('InternalFileScreen');
    }

    const _gotoAutoInput = () => {
        props.navigation.navigate('AutoInputScreen');
    }

    const _gotoMapScreen = () => {
        props.navigation.navigate('GoogleMapScreen');
    }

    return (
        <View style={{ marginTop: 100, marginHorizontal: 20 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={_gotoStorageScreen}
                style={{ marginTop: 14 }}>
                <Text style={styles.styleTouch}>Internal Storage File</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={_gotoAutoInput}
                style={{ marginTop: 14 }}>
                <Text style={styles.styleTouch}>Auto input text</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={_gotoMapScreen}
                style={{ marginTop: 14 }}>
                <Text style={styles.styleTouch}>Google map</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    styleTouch: {
        fontSize: 13,
        color: '#fff',
        backgroundColor: '#ff0000',
        paddingVertical: 8,
        textAlign: 'center'
    }
})