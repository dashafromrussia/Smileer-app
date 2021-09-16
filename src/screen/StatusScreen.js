import React from 'react'
import {View, Text, StyleSheet, Dimensions, ActivityIndicator, FlatList} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useSelector } from 'react-redux'
import { PostList } from '../components/PostList'

export const StatusScreen = ({navigation}) =>{

  const posts= useSelector(state => state.post.posts)
  let statuses =[]
  if(posts.length!==0){
 statuses = posts.filter(el=>el.category==='status')
  }
  const loading = useSelector(state => state.post.loading)

  const navToPage =(data,content)=>{
    navigation.navigate('Page',{data:data,content:content})
  }
  
  if(loading){
    return(
      <View style={styles.main}>
       <ActivityIndicator color="black"/>
      </View>
    )
  }
  
  if(posts.length==0){
    <Text style={styles.text}>Пока нет постов...</Text> 
  }
  
    return(
      <View style={styles.main}>
        <Text style={styles.text}>Категория: Статусы</Text>  
      {statuses.length!=0 ? <FlatList data={statuses} keyExtractor={elem => elem.id.toString()}
      renderItem={({item})=>{
          return(
              <PostList data={item} openPost={navToPage}/>
          )
      }}
    />:<View style={styles.center}><Text>Статусов нет...</Text></View>}
    
      </View>
    )
}
StatusScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => {
      return (
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 20
          }}
        >
          Статусы
        </Text>
      );
    },
      headerLeft:()=>
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title='Toggle Drawer'
            iconName='ios-menu'
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
    }
  }

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding:10,
    fontFamily:'open-regular'
  },
  text:{
    color:"black",
    fontFamily:'open-regular',
    fontSize: 24
  },
  center: {
    flex: 1,
    padding:10,
    alignItems:'center',
    fontFamily:'open-regular',
    justifyContent:'center'
  }
})
