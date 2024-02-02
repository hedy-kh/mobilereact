import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Axios from 'axios';

const BaseUrl = 'http://localhost:8000/api/user'; // Replace with your actual backend API base URL

const OTPVerificationScreen = ({ route, navigation }) => {
  const [otp, setOTP] = useState('');

  const handleVerifyOTP = async () => {
    const { email } = route.params;

    try {
      const { data: verificationResponse } = await Axios.post(`${BaseUrl}/verify-email`, {
        email,
        otp,
      });

      if (verificationResponse.success) {
        alert('OTP verification successful!');
        // You can navigate to another screen or perform any action upon successful verification
        // navigation.navigate('Home');
      } else {
        alert(verificationResponse.error);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert('An error occurred during OTP verification. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the OTP sent to your email:</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        onChangeText={setOTP}
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1A1A',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#898282',
    color: '#333',
    width: 200,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  verifyButton: {
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
});

export default OTPVerificationScreen;
