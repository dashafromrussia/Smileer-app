import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { VideoScreen } from '../screen/VideoScreen'
import { StatusScreen } from '../screen/StatusScreen'
import { QuoteScreen } from '../screen/QuoteScreen'
import { PictureScreen } from '../screen/PictureScreen'
import { MainScreen } from '../screen/MainScreen'
import { AdminScreen } from '../screen/AdminScreen'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { View, SafeAreaView,ScrollView } from 'react-native'
import { PageScreen } from '../screen/PageScreen'

const navigationOptions ={
  headerStyle: {
    backgroundColor: 'black'
  },
  headerTintColor:'#fff'
}


const MainStackNavigator = createStackNavigator(
  {
    Main: {screen: MainScreen,
    navigationOptions:navigationOptions
    },
      
    Page: {screen: PageScreen,
      navigationOptions:navigationOptions
      }
  },
  {
}
)

const VideoStackNavigator = createStackNavigator(
  {
    Video: {screen:VideoScreen,
      navigationOptions:navigationOptions},
    Page: {screen: PageScreen,
        navigationOptions:navigationOptions
        }
  },
  {
  
  }
)
const PictureStackNavigator = createStackNavigator(
  {
    Picture: {screen:PictureScreen,
      navigationOptions:navigationOptions},
    Page: {screen: PageScreen,
        navigationOptions:navigationOptions
        }
  },
  {
  
  }
)


const StatusStackNavigator = createStackNavigator(
  {
    Status: {screen:StatusScreen,
      navigationOptions:navigationOptions},
    Page: {screen: PageScreen,
        navigationOptions:navigationOptions
        }
  },
  {

  }
)

const QuotesStackNavigator = createStackNavigator(
  {
    Quote: {screen:QuoteScreen,
      navigationOptions:navigationOptions},
    Page: {screen: PageScreen,
        navigationOptions:navigationOptions
        }
  },
  {
    
  }
)


const AdminStackNavigator = createStackNavigator(
  {
    AdminScreen: {screen:AdminScreen,
      navigationOptions:navigationOptions},
  },
  {
    
  }
)

const MainNavigator = createDrawerNavigator(
  {
    Mains: {
      screen: MainStackNavigator,
      navigationOptions: {
        drawerLabel: 'Главная',
      },
    },
    Videos: {
      screen: VideoStackNavigator,
      navigationOptions: {
        drawerLabel: 'Видео'
      }
    },
    Pictures:{
      screen: PictureStackNavigator,
      navigationOptions: {
        drawerLabel: 'Картинки'
      }
    },
    Statuses:{
      screen:StatusStackNavigator,
      navigationOptions: {
        drawerLabel: 'Статусы'
      }
    },
  Quotes:{
    screen:QuotesStackNavigator,
    navigationOptions: {
      drawerLabel: 'Цитаты'
    } 
  },
  Admin:{
    screen:AdminStackNavigator,
    navigationOptions: {
      drawerLabel: 'Админ-панель'
    } 
  },
},
  {
    contentComponent: props => <CustomDrawer {...props}/>
  }
)

const CustomDrawer = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 150, backgroundColor: 'white' }}>
      </View>
      <ScrollView>
          <DrawerItems {...props}>
          </DrawerItems>
      </ScrollView>
  </SafeAreaView>
)


export const AppNavigation = createAppContainer(MainNavigator)

