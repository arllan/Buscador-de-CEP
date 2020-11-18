import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BuscadorCep from './src/buscar';
import Sobre from './src/sobre';
import Resultado from './src/resultadoRequisicao';
import  {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function MenuDrawer(){
  return(
    <Drawer.Navigator >
      <Drawer.Screen name='BuscadorCep' component={BuscadorCep} />
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
