import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const LoginTest = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async () => {
    try {
      // 서버에 로그인 요청 보내기
      const response = await axios.post('http://localhost:3000/api/login', {
        userEmail: email,
        userPassword: password,
      })

      // JWT 저장
      await SecureStore.setItemAsync('jwt', response.data.token)
      const jwt = await SecureStore.getItemAsync('jwt')
      console.log('jwt:', jwt)
      console.log('res data:', response.data)

      // HomeScreen으로 네비게이션
      navigation.navigate('HomeTest')
    } catch (error) {
      console.error('에러발생', error)
      // 에러 처리
      setErrorMessage(
        '로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.'
      )
    }
  }

  const handleRegister = async () => {
    try {
      // 서버에 회원가입 요청 보내기
      await axios.post('http://localhost:3000/api/register', {
        userEmail: email,
        userPassword: password,
      })
      // 회원가입 후 자동으로 로그인
      await handleLogin()
    } catch (error) {
      console.error(error)
      // 에러 처리
      setErrorMessage(
        '회원가입에 실패했습니다. 이미 등록된 이메일일 수 있습니다.'
      )
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isRegistering ? 'Register' : 'Login'}
        onPress={isRegistering ? handleRegister : handleLogin}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Text
        style={styles.toggleText}
        onPress={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? 'Already have an account? Login'
          : "Don't have an account? Register"}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  toggleText: {
    marginTop: 10,
    color: 'blue',
  },
})

export default LoginTest
