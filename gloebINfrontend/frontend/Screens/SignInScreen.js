import { View, Text, KeyboardAvoidingView,Image,TextInput,Dimensions,TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react';


const SignInScreen = ({navigation}) => {
  return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
    <Image source={require('../assets/globinLogo.png')} style={styles.circularImage} />
    <Text style={styles.signInText}>Sign In</Text>
    <TextInput style={styles.input} placeholder="example@gmail.com" />
    <TextInput style={styles.input} placeholder="password" />
    <TouchableOpacity style={[styles.button, styles.loginButton, { width: width - 40 }]}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}
  style={[styles.button, styles.createAccountButton]}>
  <Text style={styles.buttonText}>Create Account</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}
                  style={styles.forgotPassword}>
  <Text style={styles.linkText}>Forgot Password?</Text>
</TouchableOpacity>
    <View style={styles.socialLoginSection}>
      <Text style={styles.socialLoginText}>Sign in with</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#000000' }]}>
          <Image source={require('../assets/apple.png')} style={styles.socialButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#FFFFFF' }]}>
          <Image source={require('../assets/google.png')} style={styles.socialButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#3B5998' }]}>
          <Image source={require('../assets/facebook.png')} style={styles.socialButtonImage} />
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>

  )
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#1B1A1A',
  },
  circularImage: {
    width: width * 0.2,
    height: height * 0.1,
    borderRadius: (width * 0.4) / 2,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: height * 0.05,
  },
  signInText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
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
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#FF5934',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  createAccountButton: {
    backgroundColor: '#808080',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 18,
    width: width - 40,
  },
  forgotPassword: {
    marginTop: 10,
  },
  linkText: {
    color: '#0084FF',
    fontSize: 16,
    textAlign: 'center',
  },
  socialLoginSection: {
    marginTop: 20,
  },
  socialLoginText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 40, // Adjusted width for better alignment
    marginTop: 20,
  },
  socialButton: {
    flex: 1, // Make each social button take equal space
    backgroundColor: '#000000',
    marginHorizontal: 5, // Add margin for better separation
    paddingVertical: 15, // Increased padding for better touch area
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonImage: {
    width: 40, // Adjusted width for the images
    height: 40, // Adjusted height for the images
  },
});


export default SignInScreen