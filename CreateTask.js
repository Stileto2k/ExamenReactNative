import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert } from 'react-native';

const CreateTask = ({ route, navigation }) => {
  const { addTask } = route.params; // Obtenim la funció addTask des de MainPage

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleCreateTask = () => {
    // Validem que el títol no estigui buit
    if (!title) {
      Alert.alert('Error', 'El títol és obligatori!');
      return;
    }

    // Creem una nova tasca
    const newTask = {
      id: Math.random().toString(), // Generem un ID únic per a cada tasca
      title,
      date,
      completed: false,
    };

    // Afegim la nova tasca a la llista a través de la funció addTask
    addTask(newTask);

    // Tornem a la pantalla principal després de crear la tasca
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear Nova Tasca</Text>

      <TextInput
        style={styles.input}
        placeholder="Títol de la tasca"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Data límit (opcional)"
        value={date}
        onChangeText={setDate}
      />

      <Button title="Crear Tasca" onPress={handleCreateTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default CreateTask;
