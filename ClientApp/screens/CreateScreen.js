import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { getDepartmentsFromApi, postContactToApi } from '../services/contactsService';


export default function CreateScreen({ navigation }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [departmentId, setDepartmentId] = useState(0);
    const [departments, setDepartments] = useState([]);

    const saveContact = function() {

        postContactToApi(name, phone, email, address, departmentId)
        .then(() => {
            navigation.navigate('Home');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const contactSavedAlert=()=>{
        alert('New Contact Saved');
        saveContact();
    }

    useFocusEffect(
        React.useCallback(() => {
            getDepartmentsFromApi()
                .then((data => setDepartments(data)))
                .catch((error) => console.error(error));
        }, [])
    );

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInputBox} placeholder="Enter name" value={name}
                onChangeText={(text) => setName(text)}/>
            <TextInput style={styles.textInputBox} placeholder="Enter phone number" value={phone}
                onChangeText={(text) => setPhone(text)}/>
            <TextInput style={styles.textInputBox} placeholder="Enter email" value={email}
                onChangeText={(text) => setEmail(text)}/>
            <TextInput style={styles.textInputBox} placeholder="Enter address" value={address}
                onChangeText={(text) => setAddress(text)}/>
            <View style={{paddingBottom: 30}}>
                <Picker 
                    style={styles.textInputBox}
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
                color="#941a1d" 
                onPress={(e) => contactSavedAlert()}
                title="Add Contact"
            />
        </View>
    )
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
