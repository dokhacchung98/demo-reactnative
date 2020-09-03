import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, NativeModules } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import GetLocation from 'react-native-get-location';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default function GoogleMapScreen(props) {
    var Toast = NativeModules.ToastModule;
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324
    })

    const ggMap = useRef(null);

    useEffect(() => {
        _zgetCurrentLocation();
    }, []);

    useEffect(() => {

    }, [currentLocation]);

    const _zgetCurrentLocation = async () => {
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                setCurrentLocation({
                    latitude: location.latitude,
                    longitude: location.longitude
                })
            }, e => {
                console.log('get current location err: ', e)
                Toast.showMessage('Lỗi lấy địa chỉ hiện tại', e.message)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                ref={ggMap}
                region={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    coordinate={currentLocation}
                    title={'Demo marker'}
                    description={'this is demo marker'}
                />
            </MapView>
        </View>
    )
}