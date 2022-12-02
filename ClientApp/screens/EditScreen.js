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

    const updatedContactDetailsAlert = () => {
        alert('Contact Details Updated')
        SaveContact()
    }

    const SaveContact = function () {
        const contact = {
            id: contactId,
            name,
            phone,
            email,
            address,
            departmentId
        };

        updateContactToApi(contact)
            .then(() => {
                // If everything goes well, navigate back to 'Home'
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInputBox}
                placeholder="Please enter name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.textInputBox}
                placeholder="Please enter phone number"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
            <TextInput
                style={styles.textInputBox}
                placeholder="Please enter email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.textInputBox}
                placeholder="Please enter address"
                value={address}
                onChangeText={(text) => setAddress(text)}
            />
            <Text style={{color: '#fff'}}>Department Id Debug: {departmentId}</Text>
            <View style={{paddingBottom: 30}}>
                <Picker
                    selectedValue={departmentId}
                    onValueChange={(itemValue, itemIndex) =>
                        setDepartmentId(itemValue)
                    }
                >
                    <Picker.Item label="Please select..." value="0" />
                    {departments.map((d) =>
                        <Picker.Item key={d.id} label={d.name} value={d.id} />
                    )}
                </Picker>
            </View>
            <Button
                marginVertical= "1%"
                color="#941a1d" 
                onPress={(e) => updatedContactDetailsAlert()}
                title="Update Contact"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626',
        paddingLeft: 5,
        paddingRight: 5,
    },
    textInputBox: {
        marginVertical: "1%",
        backgroundColor: "#fff"
    }
});

