import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Switch, Alert } from 'react-native';

const EditTask = ({ route, navigation }) => {
  const { task, updateTask } = route.params; // Obtenim la tasca i la funció updateTask del route params
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.dueDate || ''); // Si no hi ha data límit, es deixa en blanc
  const [hasDueDate, setHasDueDate] = useState(task.dueDate ? true : false); // Si ja hi ha una data, el switch serà true

  useEffect(() => {
    setTitle(task.title);
    setDueDate(task.dueDate || '');
    setHasDueDate(task.dueDate ? true : false);
  }, [task]);

  const handleSave = () => {
    if (!title) {
      Alert.alert('Error', 'El títol és obligatori!');
      return;
    }
    updateTask({ ...task, title, dueDate: hasDueDate ? dueDate : null }); // Actualitzem la tasca amb les dades modificades
    navigation.goBack(); // Tornem a la pantalla principal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Tasca</Text>

      {/* Input per al títol */}
      <TextInput
        style={styles.input}
        placeholder="Títol de la tasca"
        value={title}
        onChangeText={setTitle}
      />

      {/* Switch per a la data límit */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Has due date?</Text>
        <Switch
          value={hasDueDate}
          onValueChange={setHasDueDate} // Canvia l'estat de hasDueDate
        />
      </View>

      {/* Input per la data límit */}
      <TextInput
        style={styles.input}
        placeholder="Data límit (opcional)"
        value={dueDate}
        onChangeText={setDueDate}
        editable={hasDueDate} // Només editable si el switch està activat
      />

      {/* Botó per guardar els canvis */}
      <Button title="Guardar" onPress={handleSave} />
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
});

export default EditTask;
