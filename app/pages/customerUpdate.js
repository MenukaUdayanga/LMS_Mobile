import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
 import { updateStudent } from '../services/studentService'
const CustomerUpdate = () => {
  const router = useRouter();
  const { id,studentName, age, grade } = useLocalSearchParams(); 
 
  const [name, setName] = useState(studentName || '');  
  const [studentAge, setStudentAge] = useState(age || '');  
  const [studentGrade, setStudentGrade] = useState(grade || '');  
  const [loading, setLoading] = useState(false);  

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


  const handleUpdateCustomer = async () => {
    if (!name || !studentAge || !studentGrade) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    const { currentDate, currentTime } = getCurrentDateTime();

    try {
      setLoading(true);  
      console.log("id ",id);
      console.log("name ",name);
      console.log("studentAge ",studentAge);
      console.log("studentGrade ",studentGrade);
      const response = await updateStudent(id,name, currentDate, currentTime, studentAge, studentGrade);
      console.log('Customer updated:', response);
      
      Alert.alert('Success', 'Customer details updated successfully!');
      router.push('mainPage/studentList'); 
    } catch (error) {
      console.error('Error updating customer:', error);
      Alert.alert('Error', 'Failed to update customer. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      {/* Full-page white screen loader while updating */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="black" />
          <Text style={styles.loadingText}>Updating Student...</Text>
        </View>
      )}

      <Text style={styles.title}>Update Student</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Customer Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Grade"
        value={studentGrade}
        onChangeText={setStudentGrade}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        value={studentAge}
        onChangeText={setStudentAge}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateCustomer} disabled={loading}>
        <Text style={styles.buttonText}>Update Student</Text>
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
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, 
  },
  loadingText: {
    marginTop: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomerUpdate;
