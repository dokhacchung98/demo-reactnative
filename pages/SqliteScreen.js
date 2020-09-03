import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ScrollView, TextInput } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-tiny-toast'

export default function SqliteScreen(props) {
    var db = openDatabase({ name: 'demosql.db', createFromLocation: 1, location: 'default' },
        () => {
            console.log('open db success');
        }, err => {
            console.log('open db error: ', err)
        });
    const [listUser, setListUser] = useState([])
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    useEffect(() => {
        _getAllUser();
    }, [])

    const _getAllUser = () => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM tabledemo", [], (tx, results) => {
                console.log("Query completed");
                var tmp = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    tmp.push(row);
                    console.log(`Employee name: ${row.name}, age: ${row.age}`);
                }
                setListUser(tmp);
            }, err => {
                Toast.show(err.message);
                console.log('open sql error: ', err)
            });
        });
    }

    const _addValues = () => {
        _insertUser("Nguyen Van Nam", 20);
        _insertUser("Hoang Van Tam", 23);
        _insertUser("Do Minh Hung", 65);
        _insertUser("Tran Binh Minh", 32);
    }

    const _insertUser = (name, age) => {
        var id = Math.floor(Math.random() * 999999);
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO tabledemo VALUES (${id}, '${name}', ${age})`, [], (tx, results) => {
                console.log("Query completed");
                _getAllUser();
            }, err => {
                Toast.show(err.message);
                console.log('open sql error: ', err)
            });
        });
    }

    const _createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(`CREATE TABLE tabledemo (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                age TEXT NOT NULL
            );`, [], (tx, results) => {
                console.log("Query completed");
                console.log(results.rows)
            }, err => {
                Toast.show(err.message);
                console.log('open sql error: ', err)
            });
        });
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginHorizontal: 12, paddingVertical: 4 }}>
                <Text>ID: {item.id}</Text>
                <Text>Ho va Ten: {item.name}</Text>
                <Text>Tuoi: {item.age}</Text>
            </View>
        )
    }

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <FlatList
                data={listUser}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
                ListEmptyComponent={() => {
                    return <Text style={{ textAlign: 'center' }}>Khong co nguoi dung nao</Text>
                }}
                ItemSeparatorComponent={() => <View style={{ height: 2, backgroundColor: '#eded', marginVertical: 4 }} />}
            />

            <TouchableOpacity style={{ backgroundColor: '#ff0000', marginVertical: 20, paddingVertical: 8 }} onPress={_createTable}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Create table</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: '#ff0000', marginVertical: 20, paddingVertical: 8 }} onPress={_addValues}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>insert value</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: '#ff0000', marginVertical: 20, paddingVertical: 8 }} onPress={_getAllUser}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>get value</Text>
            </TouchableOpacity>

            <TextInput style={{ borderWidth: 1, borderRadius: 4, marginVertical: 8, marginHorizontal: 20 }} placeholder="name" value={name} onChangeText={t => setName(t)} />
            <TextInput style={{ borderWidth: 1, borderRadius: 4, marginVertical: 8, marginHorizontal: 20 }} placeholder="age" value={age} keyboardType='numeric' onChangeText={t => setAge(Number(t))} />

            <TouchableOpacity style={{ backgroundColor: '#ff0000', marginVertical: 20, paddingVertical: 8 }} onPress={() => _insertUser(name, age)}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Add</Text>
            </TouchableOpacity>

        </ScrollView >
    )
}