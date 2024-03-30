// SignUpScreen.tsx
import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { SignUp } from '../libs/auth'
import { useNavigation } from '@react-navigation/native'

const SignUpScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    try {
      await SignUp({ email, password })
      // 회원가입 후 네비게이션 또는 화면 이동 코드 작성
      navigation.goBack()
    } catch (error) {
      console.error('SignUp Error:', error)
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
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
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
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
})

export default SignUpScreen
