import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function HomeScreen({ route }) {
  const { accessToken } = route.params
  const isKakaoLogin = route.name === 'KakaoLogin' // KakaoLogin 컴포넌트에서 네비게이션 시 이름을 설정해 주어야 합니다.

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>로그인 성공</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.tokenContianer}>
        <Text style={styles.accessText}>
          {isKakaoLogin ? 'kakao access token: ' : 'access token: '}
        </Text>
        <Text style={styles.tokenText}>{accessToken}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tokenContianer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#845EC2',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  accessText: {
    fontSize: 22,
    marginBottom: 8,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  tokenText: {
    paddingHorizontal: 20,
  },
  line: {
    backgroundColor: 'black',
    width: '100%',
    height: 2,
    marginTop: 15,
  },
})
