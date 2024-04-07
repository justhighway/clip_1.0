import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import SignForm from '../components/SignForm'
import SignButtons from '../components/SignButtons'
import { signIn, signUp } from '../libs/auth'
import OAuthButtons from '../components/OAuthButtons'
import AnimatedTitle from '../components/AnimatedTitle'
import { styles } from './SignInScreen'

export const SignInScreen = ({ navigation, route }) => {
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
    setForm(prevForm => ({ ...prevForm, [name]: value }))
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
