import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import SignForm from '../components/SignForm'
import SignButtons from '../components/SignButtons'
import { SignIn, SignUp } from '../libs/auth'

const SignInScreen = ({ navigation, route }) => {
  // nullish 병합 연산자 - params 지정 안해주면 undefined임
  // undefined 객체 구조 분해 할당 하면 에러 발생하므로
  // 빈 객체로 구조 분해 할당 해 에러 처리
  const { isSignUp } = route.params || {}
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState()

  const createChangeTextHandler = name => value => {
    setForm({ ...form, [name]: value })
  }

  const onSubmit = async () => {
    Keyboard.dismiss()
    const { email, password } = form
    const info = { email, password }
    setLoading(true)
    try {
      const { user } = isSignUp ? await SignUp(info) : await SignIn(info)
      console.log(user)
    } catch (e) {
      Alert.alert('로그인 실패', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ ios: 'padding' })}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>CLIP</Text>
        <View style={styles.form}>
          <SignForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
})

export default SignInScreen
