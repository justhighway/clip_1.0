import HomeScreen from '../screens/HomeScreen'
import HomeTest from '../screens/HomeTest'
import KakaoLogin from '../screens/KakaoLogin'
import SignInScreen from '../screens/SignInScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      <Stack.Screen name="HomeTest" component={HomeTest} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default RootStack
