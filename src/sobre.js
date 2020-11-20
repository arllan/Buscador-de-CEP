import React, {useState, useRef} from 'react'; // lin padrão do react que e uma dependencia 
import {View, Text, StyleSheet, Linking, Alert, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native'; // lib do react native
import { AntDesign } from '@expo/vector-icons';  // lib de icones SVG
import * as Animatable from 'react-native-animatable'; // lib de animação
import  {useNavigation} from '@react-navigation/native'; // lib de navegação
import axios from "axios"; // lib requisição http

export default () => {
   
    const navigation = useNavigation();

    function menu() {
        navigation.navigate('Buscar')
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.menu}>
                <AntDesign name="arrowleft" size={24} color="#fff" onPress={menu} />
                <Text style={styles.textoMenu}>Sobre</Text>
            </View>
            <View style={styles.containerBuscar}>
                <Text style={styles.textoTitulo}>
                    MasterCEP
                </Text>
                <Text style={styles.textoDescricao}>
                    O masterCEP é um aplicativo desenvolvido por Arllan Pablo, que tem por objetivo facilitar a vida das pessoas que, por algum motivo (seja ele o trabalho ou necessidade instantânea), deseja descobrir o CEP e/ou enredeço de um determinado local.
                </Text>
                <Text style={styles.textoDescricao}>
                    De uma maneira bastante rápida e simples, você encontra qualquer CEP a partir de uma busca rápida.
                </Text>
                <Text style={styles.textoDescricao}>
                    Caso possua alguma dúvida, sugestão ou crítica, fale conosco através do email.
                </Text>
                <Text style={styles.textoEmail} onPress={() => Linking.openURL('mailto:arllanpablo@gmail.com?subject=Aplicativo&body=escreva aqui')}>
                    arllanpablo@gmail.com
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
    },
    menu:{
        flexDirection:"row",
        top:22,
        backgroundColor:"#1465C0",
        width:'100%',
        height:60,
        alignItems:"center",
        paddingLeft:18
    },
    textoMenu:{
        marginLeft:30,
        color:"#fff",
        fontSize:20,
    },
    containerBuscar:{
        marginTop:25,
        flexDirection:"column",
        alignItems: 'center',
        justifyContent: 'center',
        margin:20,
        padding:20,
    },
    textoTitulo:{
        fontSize:25,
        color:"#000",
    },
    textoDescricao:{
        marginTop:10,
        fontSize:14,
        textAlign:"center",
        color:"#000",
    },
    textoEmail:{
        marginTop:15,
        fontSize:17,
        color:"red",
        fontWeight:"bold",
        textDecorationLine: 'underline'
    }
})