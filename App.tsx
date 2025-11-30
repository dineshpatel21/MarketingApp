import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './src/navigation/Navigation'
import { useEffect, useState } from 'react'
import { Utils } from './Utils'
import { KeyboardAvoidingView, Platform } from 'react-native'

const App = () => {
  const [loggeIn, setLoggedIn] = useState(null)
  useEffect(() => {
    userLogged()
  }, [])

  const userLogged = async () => {
    const user = await Utils.getData("logged_user");
    setLoggedIn(user)
  }

  return <SafeAreaProvider>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Navigation loggeIn={loggeIn} />
    </KeyboardAvoidingView>

  </SafeAreaProvider>
}

export default App

