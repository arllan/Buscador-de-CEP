import React, {useState, useRef} from 'react'; // lin padrão do react que e uma dependencia 
import {View, Text, StyleSheet, Linking, Share, Alert, TouchableOpacity} from 'react-native'; // lib do react native
import { AntDesign, Entypo } from '@expo/vector-icons';  // lib de icones SVG
import * as Animatable from 'react-native-animatable'; // lib de animação
import  {useNavigation} from '@react-navigation/native'; // lib de navegação

export default ({route}) => {
    
    const navigation = useNavigation();

    function menu() {
        navigation.navigate('Buscar')
    }

    async function abrirGoogleMaps(){ 
        try{
            //console.warn(route.params.cep.replace('-',''));
            await Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${route.params.cep}`)
        }catch(e){
            Alert.alert(e.message)
        }
    }

    function SalvarPreferidos(){
        Alert.alert('Funcionalidade de salvar preferidos em desenvolvimento')
    }


    var texto = 'CEP: ' + route.params.cep + ', ' + ' BAIRRO: ' + route.params.bairro + ', '  + ' LONGRADOURO: ' + route.params.logradouro + ', ' + ' LOCALIDADE : ' + route.params.localidade + ', ' + route.params.uf ;

    const onShare = async () => {
      try {
        const result = await Share.share({
          message: texto ,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };

    return(
        <View style={styles.container}>
            <View style={styles.menu}>
                <AntDesign name="arrowleft" size={24} color="#fff" onPress={menu} />
                <Text style={styles.textoMenu}>Resultado</Text>
            </View>
            <View style={styles.containerBuscar}>
                <View style={styles.containerElementosCep}>
                    <View style={styles.parteCep}><Text style={styles.corTextoResultado}>CEP</Text></View>
                    <View style={styles.parteTextoCep}><Text style={styles.corTextoResultado}>{route.params.cep}</Text></View>
                </View>
                <View style={styles.containerElementosCep}>
                    <View style={styles.parteCep}><Text style={styles.corTextoResultado}>BAIRRO</Text></View>
                    <View style={styles.parteTextoCep}><Text style={styles.corTextoResultado}>{route.params.bairro}</Text></View>
                </View>
                <View style={styles.containerElementosCep}>
                    <View style={styles.parteCep}><Text style={styles.corTextoResultado}>LOGRADOURO</Text></View>
                    <View style={styles.parteTextoCep}><Text style={styles.corTextoResultado}>{route.params.logradouro}</Text></View>
                </View>
                <View style={styles.containerElementosCep}>
                    <View style={styles.parteCep}><Text style={styles.corTextoResultado}>LOCALIDADE</Text></View>
                    <View style={styles.parteTextoCep}><Text style={styles.corTextoResultado}>{route.params.localidade} , {route.params.uf}</Text></View>
                </View>
            </View>
            
            <View style={styles.containerCompartilhar}>
                <Entypo name="share" size={24} color="black" onPress={onShare} />
                {/* <Entypo name="star" size={24} color="black" onPress={SalvarPreferidos} /> */}
                <AntDesign name="enviroment" size={24} color="black" onPress={abrirGoogleMaps} />
            </View>
            <View style={styles.areaBotao}>
                <TouchableOpacity style={styles.botao} onPress={() => {navigation.navigate('Buscar')}}>
                    <Text style={styles.textoBotao}>Voltar</Text>
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
        marginLeft:15,
        marginRight:15,
        padding:20,
        borderColor:"#DFEBF7",
        borderWidth:1,
        borderTopEndRadius:5,
        borderTopStartRadius:5,
    },containerElementosCep:{
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:2
    },
    containerCompartilhar:{
        backgroundColor:"#fff",
        flexDirection:"row",
        alignItems: "stretch",
        justifyContent: "space-around",
        marginLeft:15,
        marginRight:15,
        padding:20,
        borderColor:"#DFEBF7",
        borderWidth:1,
        borderBottomStartRadius:5,
        borderBottomEndRadius:5
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
        fontSize:17
    },
    envoltaTextInput:{
        backgroundColor:'red',
        margin:0,
        padding:0
    },
    parteCep:{
        backgroundColor:'#DFEBF7',
        width:'45%',
        minHeight:40,
        height:"100%",
        maxHeight:60,
        justifyContent:"center",
        alignSelf:"center"
    },
    parteTextoCep:{
        backgroundColor:'#DFEBF7',
        marginLeft:2,
        width:'55%',
        minHeight:40,
        height:"100%",
        maxHeight:60,
        justifyContent:"center",
        alignSelf:"center"
    },
    corTextoResultado:{
        color:"#676C72",
        fontSize:13,
        marginLeft:10
    }
})