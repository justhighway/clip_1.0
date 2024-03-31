import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomButton from './CustomButton'

export default function SignButtons({ isSignUp, onSubmit, loading }) {
  const navigation = useNavigation()
  const primaryTitle = isSignUp ? '회원가입' : '로그인'
  const secondaryTitle = isSignUp ? '로그인' : '회원가입'

  const onSecondaryButtonPress = () => {
    if (isSignUp) {
      navigation.goBack() // signUp일 때 뒤로 가기
    } else {
      navigation.push('SignIn', { isSignUp: true }) // 아니면 isSignUp true 주면서 push
    }
  }
  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color="#845EC2" />
      </View>
    )
  }
  return (
    <View style={styles.buttons}>
      <CustomButton title={primaryTitle} hasMarginBtm onPress={onSubmit} />
      <CustomButton
        title={secondaryTitle}
        theme="secondary"
        onPress={onSecondaryButtonPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 64,
  },
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
