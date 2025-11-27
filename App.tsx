import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './src/navigation/Navigation'
import { useEffect, useState } from 'react'
import { Utils } from './Utils'

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
    <Navigation loggeIn={loggeIn} />
  </SafeAreaProvider>
}

export default App

