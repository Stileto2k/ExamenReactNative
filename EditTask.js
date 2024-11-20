import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Switch } from 'react-native';

const EditTask = ({ route, navigation }) => {
  const { task } = route.params; // Rebre la tasca per editar
  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(task.date);
  const [hasDueDate, setHasDueDate] = useState(task.hasDueDate);

  // Actualitzar la data si el switch està activat
  useEffect(() => {
    if (!hasDueDate) {
      setDate(''); // Si no hi ha data, es borra la data
    }
  }, [hasDueDate]);

  const handleSave = () => {
    if (title.trim() === '') {
      alert('El títol és obligatori!');
      return;
    }

    // Si el Switch està activat i no s'ha introduït la data, mostrar un error
    if (hasDueDate && date.trim() === '') {
      alert('Si "Has Due Date" està activat, introdueix una data!');
      return;
    }

    // Guardar els canvis i tornar a la pantalla anterior
    // Actualitzar la tasca a la llista
    navigation.goBack();
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

      <View style={styles.switchContainer}>
        <Text>Has Due Date</Text>
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
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default EditTask;
