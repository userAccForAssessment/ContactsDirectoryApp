import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { getDepartmentsFromApi, getContactByIdFromApi, updateContactToApi } from '../services/contactsService';


export default function EditScreen({ navigation, route }) {
    const contactId = route.params.id;

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [departmentId, setDepartmentId] = useState(0);
    const [departments, setDepartments] = useState([]);

    function setContact(contact) {
        setName(contact.name);
        setPhone(contact.phone);
        setEmail(contact.email);
        setAddress(contact.address);
        setDepartmentId(contact.id);
    }

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            async function fetchContact() {
                try {
                    const contact = await getContactByIdFromApi(contactId);

                    if (isActive) {
                        setContact(contact);
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            fetchContact();

            return () => {
                isActive = false;
            };
        }, [contactId])
    );

    useFocusEffect(
        React.useCallback(() => {
            getDepartmentsFromApi()
                .then((data => setDepartments(data)))
                .catch((error) => console.error(error));
        }, [])
    );

    return (
        <View style={styles.container} >
            <Text style={styles.textBox}>{name}</Text>
            <Text style={styles.textBox}>{phone}</Text>
            <Text style={styles.textBox}>{email}</Text>
            <Text style={styles.textBox}>{address}</Text>
            <Text style={styles.textBox}>Department Id: {departmentId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: "5%"
    },
    textBox: {
        backgroundColor: '#fff',
        padding: 2
    }
});
