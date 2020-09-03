import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { checkMultiple, PERMISSIONS, requestMultiple } from 'react-native-permissions';

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

    const _gotoSqlite = () => {
        props.navigation.navigate('SqliteScreen');
    }

    const _gotoChat = () => {
        props.navigation.navigate('ChatScreen');
    }

    const listPermission = [
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ];

    const checkPe = () => {
        checkMultiple(listPermission).then(
            (statuses) => {
                console.log('READ_EXTERNAL_STORAGE', statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]);
                console.log('WRITE_EXTERNAL_STORAGE', statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]);
                console.log('ACCESS_FINE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
                console.log('ACCESS_COARSE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
            },
        );
    }

    const requestPr = () => {
        requestMultiple(listPermission).then(
            (statuses) => {
                console.log('READ_EXTERNAL_STORAGE', statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]);
                console.log('WRITE_EXTERNAL_STORAGE', statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]);
                console.log('ACCESS_FINE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
                console.log('ACCESS_COARSE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
            },
        );
    }

    useEffect(() => {
        checkPe();
        requestPr();
    }, [])

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
            <TouchableOpacity activeOpacity={0.8} onPress={_gotoSqlite}
                style={{ marginTop: 14 }}>
                <Text style={styles.styleTouch}>Sqlite</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={_gotoChat}
                style={{ marginTop: 14 }}>
                <Text style={styles.styleTouch}>Chat</Text>
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