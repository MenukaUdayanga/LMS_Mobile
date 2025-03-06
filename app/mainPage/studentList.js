import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getAllStudent,deleteStudent} from '../services/studentService'; 

const StudentList = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]); 
  const [loading, setLoading] = useState(true); 


  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudent(); 
      console.log("Student data:", data);
      if (data && Array.isArray(data)) {
        setStudents(data);
      } else {
        setStudents([]); 
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Student',
      'Are you sure you want to delete this student?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {  
            try {
              console.log(`Attempting to delete student with id: ${id}`);
              
              const response = await deleteStudent(id);
              
              console.log('Delete Response:', response);
              
              if (response.data && response.data.message === 'Student deleted successfully!') {  
                console.log('Student deleted successfully!');
                fetchStudents();  
                Alert.alert('Success', 'Student deleted successfully.');
              } else {
                console.log('Failed to delete the student or unexpected response:', response);
                Alert.alert('Error', 'Failed to delete student.');
              }
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Something went wrong while deleting.');
            }
          }
        },
      ],
      { cancelable: true }
    );
  };
  
  

  const handleUpdate = (id, studentName, age, grade) => {
    router.push(`pages/customerUpdate?id=${id}&studentName=${studentName}&age=${age}&grade=${grade}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.studentName}>{item.studentName}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.create_date}</Text>
          <Text style={styles.dateText}>{item.create_time}</Text>
        </View>
      </View>
      
      <Text style={styles.studentDetails}>Age: {item.age}</Text>
      <Text style={styles.studentDetails}>Grade: {item.grade}</Text>
  
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(item._id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.button, styles.updateButton]}
          onPress={() => handleUpdate(item._id,item.studentName,item.age,item.grade)}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" style={styles.centered} />
      ) : students.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.noDataText}>No Student Data</Text>
        </View>
      ) : (
        <FlatList
          data={students}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  studentDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  updateButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  
  dateContainer: {
    alignItems: 'flex-end',
  },
  
  dateText: {
    fontSize: 14,
    color: '#555',
    marginTop:5
  },
  
});

export default StudentList;
