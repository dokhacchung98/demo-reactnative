import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';

const LIST = [
    'value 1',
    'value 2',
    'value 3',
    'value 4',
    'value 5',
    'value 6',
    'value 7',
]

export default function AutoInputScreen(props) {
    const [query, setQuery] = useState('');
    const [listData, setListData] = useState([]);

    useEffect(() => {
        if (query != undefined && query.trim() != '') {
            const tmp = LIST.filter(t => t.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
            setListData(tmp);
        } else {
            setListData([]);
        }
    }, [query])

    return (
        <View style={styles.viewBoundStyle}>
            <View style={styles.autocompleteContainer}>
                <Autocomplete
                    data={listData}
                    defaultValue={query}
                    key="dmoe"
                    onChangeText={text => setQuery(text)}
                    renderItem={({ item, i }) => (
                        <TouchableOpacity onPress={() => setQuery(item)} key={item}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    viewBoundStyle: {
        borderWidth: 1,
        flex: 1,
        marginTop: 100
    },
});