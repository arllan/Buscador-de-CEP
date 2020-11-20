import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Buscar from './src/buscar';
import Sobre from './src/sobre';
import Resultado from './src/resultadoRequisicao';
import  {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function DrawerCustomizado(props) {
  return(
      <DrawerContentScrollView {...props}>
          <View style={{width:'100%', height:77, alignItems:'center',justifyContent:'center', marginTop:40, marginBottom:80}}>
              <Image source={require('./assets/icon.png')} style={{width:"100%", height:200}}/>
          </View>
          <DrawerItemList {...props}/>
      </DrawerContentScrollView>
  )
}

function MenuDrawer(){
  return(
    <Drawer.Navigator drawerContent={DrawerCustomizado} >
      <Drawer.Screen name='Buscar' component={Buscar} />
      <Drawer.Screen name='Sobre' component={Sobre} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#0D467B"/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MenuDrawer" component={MenuDrawer} options={{headerShown: false}}/>
          <Stack.Screen name='Resultado' component={Resultado} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
