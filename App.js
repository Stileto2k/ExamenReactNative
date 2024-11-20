import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'; // Afegit per a la navegació
import { createStackNavigator } from '@react-navigation/stack'; // Afegit per a la creació de stack
import MainPage from './MainPage'; // Pantalla principal
import CreateTask from './CreateTask'; // Pantalla de creació de tasques
import EditTask from './EditTask'; // Pantalla d'edició de tasques

const Stack = createStackNavigator(); // Creació de stack de navegació

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="EditTask" component={EditTask} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
