import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'red' }}>
      {/* Student List Tab */}
      <Tabs.Screen
        name="studentList"  
        options={{
          title: 'Student List',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
          headerTitleAlign: 'center',
        }}
      />

      {/* Add Student Tab */}
      <Tabs.Screen
        name="student"  
        options={{
          title: 'Add Student',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-plus" color={color} />,
          headerTitleAlign: 'center',
        }}
      />

      {/* Add Student Tab */}
      <Tabs.Screen
        name="account"  
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          headerTitleAlign: 'center',
        }}
      />
    </Tabs>

    
  );
}
