import React, { useRef } from 'react'
import BorderedInput from './BorderedInput'

export default function SignForm({
  isSignUp,
  onSubmit,
  form,
  createChangeTextHandler,
}) {
  const { passwordRef, confirmPasswordRef } = useRef()
  return (
    <>
      <BorderedInput
        placeholder="이메일"
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
        hasMarginBtm
      />
      <BorderedInput
        placeholder="비밀번호"
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current.focus()
          } else {
            onSubmit()
          }
        }}
        hasMarginBtm={isSignUp}
      />
      {/*SignUp이면 hasMarginBtm이 true*/}
      {isSignUp && (
        <BorderedInput
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  )
}
