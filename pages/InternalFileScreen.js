import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, NativeModules } from 'react-native';
import * as RNFS from 'react-native-fs';

export default function InternalFileScreen(props) {
    var Toast = NativeModules.ToastModule;
    var pathFile = RNFS.DocumentDirectoryPath + '/test.txt';

    console.log('pathFile', pathFile)

    const _readFile = () => {
        RNFS.readFile(pathFile, 'utf8').then(res => {
            console.log('read file: ', res);
            setContentFile(res);
        }, err => {
            console.log(err.message, err.code);
        }).catch(err => {
            console.log(err.message, err.code);
        });
    }

    const _writeFile = () => {
        console.log('value: ', content)
        RNFS.writeFile(pathFile, content.toString(), 'utf8').then(res => {
            Toast.showMessage('Lưu file thành công');
            _readFile();
        }, err => {
            console.log(err.message, err.code);
        }).catch(err => {
            Toast.showMessage(err.message);
            console.log(err.message, err.code);
        });
    }

    const _checkFile = () => {
        RNFS.readDir(RNFS.DocumentDirectoryPath)
            .then((result) => {
                return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            .then((statResult) => {
                if (statResult[0].isFile()) {
                    return _readFile();
                }
                return 'no file';
            })
            .catch((err) => {
                Toast.showMessage(err.message);
                console.log(err.message, err.code);
            });
    }

    const [content, setContent] = useState('');
    const [contentFile, setContentFile] = useState('')

    useEffect(() => {
        _checkFile();
    }, [])

    return (
        <View style={{ marginHorizontal: 20 }}>
            <Text style={{ marginTop: 50, marginBottom: 10 }}>Value File:</Text>
            <Text style={{ marginTop: 50, marginBottom: 10, borderWidth: 1, borderRadius: 4, paddingVertical: 20, paddingHorizontal: 10 }}>{contentFile}</Text>
            <TextInput style={{ borderWidth: 1, borderRadius: 4, marginVertical: 10 }} value={content} onChangeText={t => setContent(t)} />
            <TouchableOpacity onPress={_writeFile} style={{ marginVertical: 10, marginHorizontal: 20, backgroundColor: '#ff0000', paddingVertical: 10 }}>
                <Text style={{ textAlign: 'center', color: '#fff' }}>Lưu file</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_readFile} style={{ marginVertical: 10, marginHorizontal: 20, backgroundColor: '#ff0000', paddingVertical: 10 }}>
                <Text style={{ textAlign: 'center', color: '#fff' }}>Doc file</Text>
            </TouchableOpacity>
        </View>
    )
}