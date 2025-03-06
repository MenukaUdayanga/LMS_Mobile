import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { addStudent } from '../services/studentService';

const StudentAdd = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const getCurrentDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0'); 
    const currentDate = `${year}/${month}/${day}`;

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0'); 
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    const currentTime = `${hours}.${minutes} ${ampm}`;

    return { currentDate, currentTime };
  };

  const handleAddStudent = async () => {
    if (!name || !grade || !age) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    const { currentDate, currentTime } = getCurrentDateTime();

    try {
      setLoading(true); 
      console.log('Student data:', { name, create_date: currentDate, create_time: currentTime, grade, age });

      const response = await addStudent(name, currentDate, currentTime, grade, age);

      console.log('Save student:', response);

      Alert.alert('Success', 'Student added successfully!');
      router.push('mainPage/student');
    } catch (error) {
      console.error('Error adding student:', error);
      Alert.alert('Error', 'Failed to add student. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      {/* Full-page white screen loader */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="black" />
          <Text style={styles.loadingText}>Adding Student...</Text>
        </View>
      )}

      <Text style={styles.title}>Add Student</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Student Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Grade"
        value={grade}
        onChangeText={setGrade}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddStudent} disabled={loading}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Full-page white screen loading overlay styles
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff', // White background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Ensure it overlays everything
  },
  loadingText: {
    marginTop: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StudentAdd;
