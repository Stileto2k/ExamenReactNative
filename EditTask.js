import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert } from 'react-native';

const EditTask = ({ route, navigation }) => {
  const { task, editTask } = route.params; // Obtenim la tasca i la funció editTask des de MainPage

  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(task.date);

  useEffect(() => {
    setTitle(task.title); // Inicialitzem els valors amb la tasca seleccionada
    setDate(task.date);
  }, [task]);

  const handleEditTask = () => {
    if (!title) {
      Alert.alert('Error', 'El títol és obligatori!');
      return;
    }

    const updatedTask = { ...task, title, date };

    editTask(updatedTask); // Cridem la funció editTask amb la tasca actualitzada
    navigation.goBack(); // Tornem a la pantalla principal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Tasca</Text>

      <TextInput
        style={styles.input}
        placeholder="Títol de la tasca"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Data límit"
        value={date}
        onChangeText={setDate}
      />

      <Button title="Guardar Canvis" onPress={handleEditTask} />
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

export default EditTask;
