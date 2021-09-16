import React,{useState} from 'react';
import AppLoading from 'expo-app-loading'
import { AppNavigation } from './src/navigation/AppNavigation'
import { bootstrap } from './src/bootstrap'
import { Provider } from 'react-redux'
import store from './src/store'


  export default function App() {
  const [isReady, setIsReady] = useState(false)

  
 if (!isReady) {
      return (
        <AppLoading
          startAsync={bootstrap}
          onFinish={() => setIsReady(true)}
          onError={err => console.log(err)}
        />
      )
    }
  
    return (
     <Provider store={store}>
       <AppNavigation />
     </Provider>  
          )
       }
  /*{
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject"
  },
  "dependencies": {
    "expo": "~42.0.1",
    "expo-status-bar": "~1.0.4",
    "react": "16.13.1",
    "react-dom": "16.13.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-42.0.0.tar.gz",
    "react-native-web": "~0.13.12"
  },
  "devDependencies": {
    "@babel/core": "^7.9.0"
  },
  "private": true
}
*/
