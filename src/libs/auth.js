import axios from 'axios'

export const signIn = async ({ email, password }) => {
  try {
    const response = await axios.post('http://localhost:3000/users/signin', {
      userEmail: email, // 수정: 서버 요청에 필요한 필드명 변경
      userPassword: password, // 수정: 서버 요청에 필요한 필드명 변경
    })
    console.log('response:', response)
    return response.data
  } catch (error) {
    console.error('Sign In Error:', error.response.data.message)
    throw error
  }
}

export const signUp = async ({ email, password }) => {
  try {
    const response = await axios.post('http://localhost:3000/users/signup', {
      userEmail: email, // 수정: 서버 요청에 필요한 필드명 변경
      userPassword: password, // 수정: 서버 요청에 필요한 필드명 변경
    })
    console.log('response:', response)
    return response.data
  } catch (error) {
    console.error('Sign Up Error:', error.response.data.message)
    throw error
  }
}
