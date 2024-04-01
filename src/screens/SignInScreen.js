import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import SignForm from '../components/SignForm'
import SignButtons from '../components/SignButtons'
import { signIn, signUp } from '../libs/auth'
import OAuthButtons from '../components/OAuthButtons'
import { FontAwesome6 } from '@expo/vector-icons'
import AnimatedTitle from '../components/AnimatedTitle'

const SignInScreen = ({ navigation, route }) => {
  // nullish 병합 연산자 - params 지정 안해주면 undefined임
  // undefined 객체 구조 분해 할당 하면 에러 발생하므로
  // 빈 객체로 구조 분해 할당 해 에러 처리
  const { isSignUp } = route.params ?? {}
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [ATK, setATK] = useState('')
  const [uid, setUid] = useState('')

  const createChangeTextHandler = name => value => {
    setForm({ ...form, [name]: value })
  }

  const onSubmit = async () => {
    Keyboard.dismiss()
    const { email, password } = form
    const info = { email, password }
    setLoading(true)
    try {
      const { user } = isSignUp ? await signUp(info) : await signIn(info)
      if (user) {
        const accessToken = isSignUp
          ? user.stsTokenManager.accessToken
          : user.sts.stsTokenManager.accessToken
        console.log('AccessToken:', accessToken)
        navigation.navigate('HomeScreen', { accessToken })
      } else {
        console.log('로그인 또는 회원가입에 실패했습니다.')
      }
    } catch (e) {
      console.log('로그인 실패 ', e)
    } finally {
      setLoading(false)
    }
  }

  //kakao module - 나중에 삭제
  const kakaoOnSubmit = async () => {
    navigation.navigate('KakaoLogin', { screen: 'KakaoLogin' })
  }

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ ios: 'padding' })}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>CLIP으로,</Text>
          <AnimatedTitle />
        </View>
        <View style={styles.formContainer}>
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
        <View style={styles.oauthContainer}>
          <OAuthButtons />
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
  titleContainer: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#403257',
    marginTop: 30,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  oauthContainer: {
    flex: 0.5,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
})

export default SignInScreen
