import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAvoidingView, Platform, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {

const [user, setUser] = useState('');

//useEffect = disparar as funcionalidades assim que o componente for exibido em tela ou quando alguma informação muda
//O colchete informa que quando tais variáveis mudar, ele vai executar a função de novo, e deixamos vazio porque ele será exibido apenas uma vez em tela
useEffect(() => {
     AsyncStorage.getItem('user').then( user => {
       if(user) {
           navigation.navigate('Main', { user })
       }  
     })
}, []);

//Assim que o usuário loga :
async function handleLogin(){
    const response = await api.post('/devs', { username: user });
    //recuperar o id do usuário através de um response.data
    const { _id } = response.data;
    
    //ferramente que permite armazenamento em um banco de dados como o localstorage
    await AsyncStorage.setItem('user', _id)

    //agora mandamos esse id quando fazemos a navegação:
 navigation.navigate('Main', { user: _id });
}



    return ( 
    <KeyboardAvoidingView
        behavior="padding"
        enable={Platform.OS === 'ios'}
        style={styles.container}
    >
        <Image source={logo} />

        <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no Github"
        placeholderTextColor="#999"
        style={styles.input}
        value={user}
        onChangeText={setUser}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {

        flex:1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,

    }
});