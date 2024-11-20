import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Switch } from 'react-native';

const MainPage = ({ navigation }) => {
  // Array inicial de tasques
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Comprar pa', date: '2024-11-20', completed: false, hasDueDate: true },
    { id: '2', title: 'Estudiar React Native', date: '', completed: false, hasDueDate: false },
    { id: '3', title: 'Fer esport', date: '2024-11-22', completed: true, hasDueDate: true },
  ]);

  // Funció per afegir una nova tasca
  const addTask = (task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: String(prevTasks.length + 1), ...task },
    ]);
  };

  // Funció per alternar el checkbox d'una tasca
  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Funció per eliminar una tasca
  const deleteTask = (id) => {
    Alert.alert(
      'Confirmació',
      'Segur que vols eliminar aquesta tasca?',
      [
        { text: 'Cancel·lar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)),
        },
      ]
    );
  };

  // Funció per editar una tasca
  const editTask = (task) => {
    navigation.navigate('EditTask', { task }); // Passar tasca per editar
  };

  // Funció per navegar a la pantalla de crear tasca
  const handleCreateTask = () => {
    navigation.navigate('CreateTask', { addTask });
  };

  // Renderitzar cada tasca
  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Switch
        value={item.completed}
        onValueChange={() => toggleTaskCompletion(item.id)}
      />
      <View style={styles.taskDetails}>
        <Text
          style={[
            styles.taskTitle,
            item.completed && styles.completedTask, // Afegir estil per marcar com completat
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.taskDate,
            item.completed && styles.completedTask, // Afegir estil per marcar la data com completada
          ]}
        >
          {item.date ? ` - ${item.date}` : ' - Sense data límit'}
        </Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => editTask(item)}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Llistat de Tasques</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />

      {/* Botó de crear nova tasca */}
      <TouchableOpacity style={styles.createTaskButton} onPress={handleCreateTask}>
        <Text style={styles.createTaskButtonText}>Crear Nova Tasca</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Estils de la pantalla
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
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDate: {
    fontSize: 14,
    color: '#666',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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

export default MainPage;
