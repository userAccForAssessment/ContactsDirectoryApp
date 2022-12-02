import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { getContactsFromApi } from '../services/contactsService';


export default function HomeScreen({ navigation }) {
    // const navigation = props.navigation;
    // const { navigation } = props;
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(React.useCallback(() => {
        async function fetchData() {
            try {
                const data = await getContactsFromApi();
                setContacts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
        
    }, []));

    return (
        <View style={styles.container}>
            <Button color="#941a1d" title="Add Contact" onPress={(e) => navigation.navigate('Create')} />
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ContactItem item={item} navigation={navigation} />
                    )}
                />
            )}
        </View>
    )
}

function ContactItem(props) {
    const item = props.item;
    const navigation = props.navigation;

    return (
        <View style={[styles.contactItem, { backgroundColor: '#262626' }]}>
            <View style={styles.itemText}>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>{item.phone}</Text>
                    <Text style={{ marginLeft: 10 }}>{item.department.name}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.buttons}>
                    <Button color="#941a1d" style={{padding: 2}} title="Edit" onPress={() =>
                        navigation.navigate('Edit', { id: item.id })}
                    />
                </View>
                <View style={styles.buttons}>
                    <Button color="#941a1d" style={{padding: 2}} title="View" onPress={() =>
                        navigation.navigate('View', { id: item.id })}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626',
        paddingTop: "2%",
        paddingLeft: 5,
        paddingRight: 5,
    },
    contactItem: {
        marginTop: "2%",
        flexDirection: 'row',
    },
    itemText: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 2,
        marginRight: 5,
        backgroundColor: '#fff',
        borderWidth: 1
    },
    buttons: {
        padding: 2,
    }
});
