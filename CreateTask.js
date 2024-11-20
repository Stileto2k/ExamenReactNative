import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Switch, Alert } from 'react-native';

const CreateTask = ({ navigation, route }) => {
  const { addTask } = route.params; // Rebre la funció addTask com a prop
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [hasDueDate, setHasDueDate] = useState(false); // Estat per controlar si la tasca té data límit

  const handleCreateTask = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'El títol és obligatori!');
      return;
    }

    if (hasDueDate && !date.trim()) {
      Alert.alert('Error', 'Si tens una data límit, és obligatori introduir-la.');
      return;
    }

    const newTask = { title, date: hasDueDate ? date : '', hasDueDate, completed: false };
    addTask(newTask); // Afegir la tasca a l'array de tasques

    // Tornar a la pantalla principal
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

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Has due date?</Text>
        <Switch
          value={hasDueDate}
          onValueChange={setHasDueDate}
        />
      </View>

      {hasDueDate && (
        <TextInput
          style={styles.input}
          placeholder="Data límit"
          value={date}
          onChangeText={setDate}
        />
      )}

      <Button
        title="Crear Tasca"
        onPress={handleCreateTask}
      />
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
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default CreateTask;
