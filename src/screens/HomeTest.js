import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import * as SecureStore from 'expo-secure-store'

const HomeTest = ({ navigation }) => {
  const handleLogout = async () => {
    // JWT 삭제
    await SecureStore.deleteItemAsync('jwt')
    const jwt = await SecureStore.getItemAsync('jwt')

    // 로그인 화면으로 네비게이션
    navigation.navigate('LoginTest')
    console.log(jwt)
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeTest
