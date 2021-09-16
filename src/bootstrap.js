import * as Font from 'expo-font'
import { DB } from './db'

export async function bootstrap() {
  try {
    await Font.loadAsync({
      'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-regular': require('../assets/fonts/OpenSans-Regular.ttf')
    })
    await DB.initlog()
    console.log('Database login started...')

    await DB.initdata()
   console.log('data started...')

   await DB.init()
   console.log('comments started...')

   await DB.initviews()
   console.log('views started...')

  } catch (e) {
    console.log('Error: ', e)
  }
}