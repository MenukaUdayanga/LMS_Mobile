import axios from 'axios';
import env from '../constants/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

//Add student API
export const addStudent = async (studentName, create_date, create_time, grade,age) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const usersId = await AsyncStorage.getItem('userId');

    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    console.log("Student function Token:", token);
    console.log("Student function UserId:", usersId);

    const response = await axios.post(
      `${env.API_BASE_URL}/student/add`,
      {
        studentName: studentName,
        usersId: usersId,
        create_date: create_date,
        create_time: create_time,
        grade: grade,
        age:age
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error:", error);
    if (error.response) {
      console.log("Response Code:", error.response.status);
      Alert.alert('Error', error.response?.data?.message || 'Student add failed!', [{ text: 'OK' }]);
      throw new Error(error.response?.data?.message || 'Student add failed!');
    } else {
      Alert.alert('Error', 'Unable to connect to server', [{ text: 'OK' }]);
      throw new Error('Unable to connect to server');
    }
  }
};

//Get all student API
export const getAllStudent = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('userId');
  
      if (!token || !userId) {
        throw new Error('Authentication token or userId is missing.');
      }
  
      console.log("Fetching Customers - Token:", token);
      console.log("Fetching Customers - UserId:", userId);
  
      const response = await axios.get(
        `${env.API_BASE_URL}/student/getAll/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );
  
      return response.data.students; 
    } catch (error) {
      console.log("Error:", error);
      if (error.response) {
        console.log("Response Code:", error.response.status);
        Alert.alert('Error', error.response?.data?.message || 'Failed to fetch students!', [{ text: 'OK' }]);
        throw new Error(error.response?.data?.message || 'Failed to fetch students!');
      } else {
        Alert.alert('Error', 'Unable to connect to server', [{ text: 'OK' }]);
        throw new Error('Unable to connect to server');
      }
    }
  };



  //Get all student API
export const deleteStudent = async (studentId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      
  
      if (!token ) {
        throw new Error('Authentication token or userId is missing.');
      }
  
      console.log("Fetching Customers - Token:", token);
  
      const response = await axios.delete(
        `${env.API_BASE_URL}/student/delete/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );
  
      return response; 
    } catch (error) {
      console.log("Error:", error);
      if (error.response) {
        console.log("Response Code:", error.response.status);
        Alert.alert('Error', error.response?.data?.message || 'Failed to delete customer!', [{ text: 'OK' }]);
        throw new Error(error.response?.data?.message || 'Failed to delete customer!');
      } else {
        Alert.alert('Error', 'Unable to connect to server', [{ text: 'OK' }]);
        throw new Error('Unable to connect to server');
      }
    }
  };



// Update student API
export const updateStudent = async (studentId, studentName, create_date, create_time, grade, age) => {
  try {
    const token = await AsyncStorage.getItem('authToken'); 

    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    console.log("Updating Student - Token:", token);

    const response = await axios.put(
      `${env.API_BASE_URL}/student/update/${studentId}`,
      { studentName, create_date, create_time, grade, age }, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data; 
  } catch (error) {
    console.error("Error updating student:", error);

    if (error.response) {
      console.log("Response Code:", error.response.status);
      Alert.alert('Error', error.response?.data?.message || 'Failed to update student!', [{ text: 'OK' }]);
      throw new Error(error.response?.data?.message || 'Failed to update student!');
    } else {
      Alert.alert('Error', 'Unable to connect to server', [{ text: 'OK' }]);
      throw new Error('Unable to connect to server');
    }
  }
};
