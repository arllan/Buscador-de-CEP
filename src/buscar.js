import React, {useState, useRef, useEffect} from 'react'; // lin padrão do react que e uma dependencia 
import {View, Text, StyleSheet, Alert, TextInput, ActivityIndicator, TouchableOpacity, Keyboard} from 'react-native'; // lib do react native
import { Feather } from '@expo/vector-icons'; // lib de icones SVG
import * as Animatable from 'react-native-animatable'; // lib de animação
import  {useNavigation} from '@react-navigation/native'; // lib de navegação
import {useNetInfo} from '@react-native-community/netinfo'; // lib de verificaçao de status de internet
import axios from "axios"; // lib requisição http

export default () => {
    
    const ButtonRef = useRef();
    var [CEP,SetCEP] = useState("");
    var [statusRede,SetRede] = useState(false)
    var [status, Setstatus] = useState(false);
    var netInfo = useNetInfo();
    const navigation = useNavigation();

    useEffect(()=>{
        if(netInfo.isInternetReachable == true){
            SetRede(true)
        }else {
            SetRede(false)
        }
    },[netInfo.isInternetReachable])

    function buscar(){
        Keyboard.dismiss();
        if(statusRede == true){
            if(CEP.length >= 8){
                requisicao()
            }else{
                ButtonRef.current.shake();
            }
        }else{
            Alert.alert("Verifique a sua conexão com a rede!")
        }
    }

    function requisicao(){
        var cep = 53441070 ;
        Setstatus(true)
        axios.get(`https://viacep.com.br/ws/${CEP}/json/`).then((resposta)=>{

            if(resposta.status != 200) {
                 Alert.alert("Problema ao conectar ao servidor!!")
            }else{
                //console.warn(resposta.data)
                if(resposta.data.erro == true) {
                    Alert.alert("CEP não encontrado na base de dados!")
                    Setstatus(false)
                }else{
                    Setstatus(false)
                    navigation.navigate('Resultado',{cep: resposta.data.cep,
                        bairro: resposta.data.bairro,
                        logradouro: resposta.data.logradouro,
                        localidade: resposta.data.localidade,
                        uf: resposta.data.uf})
                }
            }
           
    
        }).catch((erro)=>{
            //console.warn(erro)
            if(erro.status == 400) {
                Alert.alert("Verifique os dados digitados e tente novamente!")
            }else{
                Alert.alert("Verifique os dados digitados e tente novamente!")
            }
            // Alert.alert("Problema ao conectar ao servidor! ")
            Setstatus(false)
        })
    }

    function menu() {
        navigation.toggleDrawer();
    }

    return(
        <View style={styles.container}>
            <View style={styles.menu}>
                <Feather name="menu" size={25} color="#fff" onPress={menu} />
                <Text style={styles.textoMenu}>MasterCEP</Text>
            </View>
            <Animatable.View style={styles.containerBuscar} ref={ButtonRef}>
                <Text style={styles.textoTitulo}>
                    Informe o seu CEP *
                </Text>
                <TextInput
                style={styles.campoInput}
                placeholder="40.170-110"
                onChangeText={(text) => {SetCEP(text)}}
                keyboardType='numeric'
                maxLength={10}
                />
                <Text style={styles.textoObservacao}>
                    * Não deve ser utilizado nº de casa, apartamento, lote, prédio ou abreviações.
                </Text>
            </Animatable.View>
            <View style={styles.areaBotao}>
                <TouchableOpacity style={styles.botao} onPress={buscar}>
                       {status == true
                        ? <ActivityIndicator style={styles.iconeAnimacao} animating={status} size={52} color="#fff" />
                        : <Text style={styles.textoBotao}>CONSULTAR </Text>
                       } 
                </TouchableOpacity>
            </View>
        </View>
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
        marginTop:50,
        backgroundColor:"#fff",
        flexDirection:"column",
        alignItems: 'center',
        justifyContent: 'center',
        margin:20,
        padding:20,
        borderColor:"#DFEBF7",
        borderWidth:1,
        borderRadius:5
    },
    campoInput:{
        width:"100%",
        height:50,
        backgroundColor:"#DFEBF7",
        color:"#6EB7F8",
        fontSize:22,
        paddingLeft:20,
    },
    textoTitulo:{
        alignSelf:"flex-start",
        width:"90%",
        marginBottom:15,
        fontSize:15,
    },
    textoObservacao:{
        marginTop:15,
        color:"#BBBBBB",
        fontSize:15,
        textAlign:"center"
    },
    areaBotao:{
        padding:15
    },
    botao:{
        backgroundColor:"#1465C0"
    },
    textoBotao:{
        textAlign:"center",
        marginTop:15,
        marginBottom: 15,
        color:"#fff",
        fontSize:17,
        
    },
    envoltaTextInput:{
        backgroundColor:'red',
        margin:0,
        padding:0
    }
})