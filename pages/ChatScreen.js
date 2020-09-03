import React, { useState, useEffect } from 'react';
import { View, NativeModules, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';

export default function ChatScreen(props) {
    const DeviceModule = NativeModules.DeviceModule;
    const Toast = NativeModules.ToastModule;
    const [deviceId, setDeviceId] = useState('');
    const [listMessage, setListMessage] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (DeviceModule != undefined) {
            DeviceModule.getDeviceId(
                res => {
                    setDeviceId(res);
                    console.log('device id: ', res);
                },
                err => {
                    console.log('get device id error', err)
                    Toast.showMessage(err);
                }
            );
        }
    }, []);

    const _renderItem = ({ item, index }) => {
        return (
            <View >

            </View>
        )
    }

    const _sendMesssage = () => {
        var tmp = message.trim();
        if (tmp) {
            setMessage('');
        }
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
            <View style={{ borderTopWidth: 1, paddingVertical: 4, borderColor: '#909090', borderRadius: 4, flexDirection: 'row', marginBottom: 12, alignItems: 'center' }}>
                <TextInput style={{ flex: 4, borderWidth: 1, borderColor: '#4ab3ff', borderRadius: 4, paddingHorizontal: 8 }} value={message} onChangeText={t => setMessage(t)} />
                <TouchableOpacity onPress={_sendMesssage} style={{ marginHorizontal: 16 }}>
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
            <FlatList data={listMessage}
                renderItem={_renderItem}
                ListEmptyComponent={() => <Text style={{ textAlign: 'center', marginTop: 16 }}>Không có tin nhắn nào</Text>}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#efefef', marginVertical: 6 }} />}
            />

        </View>
    )
}