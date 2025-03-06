import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { login } from '../services/authSevice';
import { Alert } from 'react-native';


const LoginScreen = () => {

 const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Email Validation
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      setEmailError('Email is required.');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  // Password Validation
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required.');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    validateEmail(email);
    validatePassword(password);

    if (!emailError && !passwordError && email && password) {
      setLoading(true); 
      try {
        console.log("email ", email);
        console.log("password ", password);
        
        const response = await login(email, password);
        console.log('Login successful:', response);

        router.push('mainPage/studentList');
        Alert.alert('Success', 'Login successful!', [{ text: 'OK' }]);

      } catch (error) {
        Alert.alert('Error', error.message || 'Login failed!', [{ text: 'OK' }]);
      } finally {
        setLoading(false); 
      }

    } else {
      Alert.alert('Error', 'Please fill in all the required fields correctly.', [{ text: 'OK' }]);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Image
            source={require('../../assets/images/loginImage.jpg')}
          style={styles.logo}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
        />
        {emailError ? <Text style={styles.inputErrorText}>{emailError}</Text> : null}

        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
        />
        {passwordError ? <Text style={styles.inputErrorText}>{passwordError}</Text> : null}

        <TouchableOpacity 
          style={[styles.button, loading ? styles.disabledButton : null]} 
          onPress={handleLogin} 
          disabled={loading} 
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" /> 
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Corrected Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <Link href="pages/register" style={styles.registerLink}>
            Register here
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingLeft: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  inputErrorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 12,
    textAlign: 'left',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 12,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: '#000',
  },
  registerLink: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
