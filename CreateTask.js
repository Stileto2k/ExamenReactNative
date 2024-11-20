import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Switch, Alert, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateTask = ({ navigation, route }) => {
  const { addTask } = route.params; // Rebre la funció addTask com a prop
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [hasDueDate, setHasDueDate] = useState(false); // Estat per controlar si la tasca té data límit
  const [showDatePicker, setShowDatePicker] = useState(false); // Estat per mostrar el DateTimePicker

  // Efecete de control: Si el switch es desmarca, amaguem el DateTimePicker
  useEffect(() => {
    if (!hasDueDate) {
      setShowDatePicker(false); // Amagar el DateTimePicker quan el switch es desmarqui
    }
  }, [hasDueDate]);

  const handleCreateTask = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'El títol és obligatori!');
      return;
    }

    // Verificar si la data no està buida només quan el switch està activat
    if (hasDueDate && (!date || date === '')) {
      Alert.alert('Error', 'Si tens una data límit, és obligatori introduir-la.');
      return;
    }

    const newTask = { title, date: hasDueDate ? date : '', hasDueDate, completed: false };
    addTask(newTask); // Afegir la tasca a l'array de tasques

    // Tornar a la pantalla principal
    navigation.goBack();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios' ? true : false); // Ens assegurem de que el DateTimePicker es tanqui a Android
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      {/* Input per al títol */}
      <TextInput
        style={styles.input}
        placeholder="Títol de la tasca"
        value={title}
        onChangeText={setTitle}
      />

      {/* Switch per determinar si té data límit */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Has due date?</Text>
        <Switch
          value={hasDueDate}
          onValueChange={setHasDueDate}
        />
      </View>

      {/* Recuadre per la data límit */}
      <TouchableOpacity 
        style={styles.dateContainer} 
        onPress={() => hasDueDate && setShowDatePicker(true)} // Només obrir el DateTimePicker si el switch està activat
      >
        <Text style={styles.dateText}>
          {hasDueDate 
            ? (date ? date.toLocaleDateString() : 'Selecciona una data') 
            : 'No té data límit'}
        </Text>
      </TouchableOpacity>

      {/* DateTimePicker per seleccionar la data */}
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? new Date(date) : new Date()}
          mode="date" // Això fa que només es mostri la selecció de la data, no l'hora
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Botó per crear la tasca */}
      <TouchableOpacity style={styles.createTaskButton} onPress={handleCreateTask}>
        <Text style={styles.createTaskButtonText}>Crear Tasca</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  dateContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  dateLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  createTaskButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  createTaskButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateTask;
