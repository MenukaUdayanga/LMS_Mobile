import axios from 'axios';
import env from '../constants/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


// Login API
export const login = async (email, password) => {
    console.log("This is hit ",email);
  try {
    const response = await axios.post(`${env.API_BASE_URL}/user/login`, {
      email,
      password,
    });

    const token =response.data.token;
    const id =response.data.user.id;
    const name =response.data.user.name;


    console.log("This is token ",token);
    console.log("This is user id ",id);

    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userId', id);
    await AsyncStorage.setItem('name', name);

    return response.data; 
  } catch (error) {
    console.log("Error ",error);
    if (error.response) {
        //  Alert.alert('Error', 'Wrong Credential!', [{ text: 'OK' }]);
      throw new Error(error.response?.data?.message || 'Login failed');
    } else {
        console.log("response code ",error.response.status);
         Alert.alert('Error', 'Login Fail!', [{ text: 'OK' }]);
      throw new Error('Unable to connect to server');
    }
  }
};



// User Register API
export const register = async (name,address,email,password) => {
  try {
    const response = await axios.post(`${env.API_BASE_URL}/user/register`, {
        name:name,
        email:email,
        phone:'0771757836',
        address:address,
        birthday:'1999-06-12',
        password:password , 
        role:'user',
    });

    return response.data; 
  } catch (error) {
    console.log("Error ",error);
    if (error.response) {
      throw new Error(error.response?.data?.message || 'Register failed');
    } else {
        console.log("response code ",error.response.status);
         Alert.alert('Error', 'Register Fail!', [{ text: 'OK' }]);
      throw new Error('Unable to connect to server');
    }
  }
};



// User Logout API

export const logout = async () => {
  try {
    await AsyncStorage.clear(); 
  } catch (error) {
    console.error('Logout Error:', error);
    throw new Error('Failed to log out'); 
  }
};


