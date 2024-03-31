import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'

const REST_API_KEY = 'e22f9a2ac0bb25d5fd4dba16ec9b9a4a'
const REDIRECT_URI = 'http://192.168.0.190:19006/Home'
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`

export default function KakaoLogin() {
  const navigation = useNavigation()
  const kakaoLoginWebView = data => {
    const exp = 'code='
    const condition = data.indexOf(exp)
    if (condition !== -1) {
      const authorizeCode = data.substring(condition + exp.length)
      requestToken(authorizeCode)
    }
  }

  const requestToken = async authorizeCode => {
    try {
      const response = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${authorizeCode}`,
        { method: 'POST' }
      )
      const data = await response.json()
      const accessToken = data.access_token
      console.log('AccessToken:', accessToken)
      // requestUserInfo(accessToken)
      storeData(accessToken)
    } catch (error) {
      console.log('error: ', error)
    }
    navigation.navigate('HomeScreen', { screen: 'HomeScreen' })
  }

  // const requestUserInfo = async accessToken => {
  //   try {
  //     const response = await fetch('https://kapi.kakao.com/v2/user/me', {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     const data = await response.json()
  //     const userEmail = data.kakao_account.email
  //     console.log('user email:', userEmail)
  //   } catch (error) {
  //     console.log('error:', error)
  //   }
  // }

  const storeData = async returnValue => {
    try {
      await AsyncStorage.setItem('userAccessToken', returnValue)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => {
          kakaoLoginWebView(event.nativeEvent['url'])
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
