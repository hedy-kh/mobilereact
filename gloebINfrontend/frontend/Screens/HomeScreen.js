import { View, Text,TouchableOpacity,StyleSheet,StatusBar } from 'react-native'
import React from 'react'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container} >
      <TouchableOpacity >
        <Text>map lhna</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text>button yhezek lpage login o sign in besh twali vendeur</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text style={{marginTop:20}}>haja okhra naseha</Text>
      </TouchableOpacity>
      <StatusBar/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
})
export default HomeScreen;