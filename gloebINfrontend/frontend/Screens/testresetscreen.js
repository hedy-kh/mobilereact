import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { queryString } from 'query-string';
import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BaseUrl = 'http://localhost:8000/api/user';

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: '',
  });
  const [invalidUser, setInvalidUser] = useState('');
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const route = useRoute();
   console.log("Route params:", route.params);

   const { token, id } = queryString.parse(route.params?.query || '');
    console.log("Token:", token);
   console.log("ID:", id);
  const navigation = useNavigation();

  const verifyToken = async () => {
    try {
      const { data } = await Axios(`${BaseUrl}/verify-token?token=${token}&id=${id}`);
      setBusy(false);
    } catch (error) {
      if (error?.response?.data) {
        const { data } = error.response;
        if (!data.response) return setInvalidUser(data.error);
        return console.log(error.response.data);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [token, id]);

  const handlePasswordChange = (text) => {
    setNewPassword({ ...newPassword, password: text });
  };

  const handleConfirmPasswordChange = (text) => {
    setNewPassword({ ...newPassword, confirmPassword: text });
  };

  const handleSubmit = async () => {
    const { password, confirmPassword } = newPassword;

    if (password.trim().length < 8 || password.trim().length > 20) {
      return setError('Password must be between 8 and 20 characters long');
    }
    if (password !== confirmPassword) {
      return setError("Passwords don't match");
    }

    try {
      setBusy(true);
      const { data } = await Axios.post(`${BaseUrl}/reset-password?token=${token}&id=${id}`, { password });
      setBusy(false);
      if (data.success) {
        navigation.replace('./ResetPasswordScreen.js');
        setSuccess(true);
      }
    } catch (error) {
      if (error?.response?.data) {
        const { data } = error.response;
        if (!data.response) return setInvalidUser(data.error);
        return console.log(error.response.data);
      }
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Reset Your Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter New Password"
        secureTextEntry
        value={newPassword.password}
        onChangeText={handlePasswordChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={newPassword.confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
      {invalidUser ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{invalidUser}</Text>
        </View>
      ) : null}
      {busy ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Verifying reset token...</Text>
        </View>
      ) : success ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Password reset successfully!</Text>
        </View>
      ) : (
        <>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1A1A',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#898282',
    color: '#333',
    width: width - 40,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF5934',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1A1A',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 20,
    textAlign: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1A1A',
  },
  successText: {
    color: '#00FF00', // Green color for success
    fontSize: 20,
    textAlign: 'center',
  },
});

export default ResetPasswordScreen;
