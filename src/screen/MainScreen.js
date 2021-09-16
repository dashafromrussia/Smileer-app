import React,{ useEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {View, Text, StyleSheet,FlatList, ActivityIndicator, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addCookie, addView, loadComments, loadLogin, loadPosts, loadViews, updateView } from '../store/actions/post'
import { PostList } from '../components/PostList'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const MainScreen = ({navigation}) =>{
  
   const dispatch = useDispatch()
    useEffect(()=>{
      getData()
      loadViews()(dispatch)
      loadComments()(dispatch)
      loadLogin()(dispatch)
      loadPosts()(dispatch)
    },[])


    const posts= useSelector(state => state.post.posts)
    const jokes =posts.length!==0 ? posts.filter(el=>el.category==='joke') : []
    const loading = useSelector(state => state.post.loading)
    const views= useSelector(state => state.post.views)
    const cookie= useSelector(state => state.post.cookie)

    const getData = async () => { 
        const value = await AsyncStorage.getItem('@storage_Key')
       addCookie(value)(dispatch)
    }


    const navToPage =(data,content)=>{
      navigation.navigate('Page',{data:data,content:content})
      if(cookie!=='admin123'){
      if(views.find(el=>el.idpost===data.id)){
        updateView({idpost:data.id, amount:views.find(el=>el.idpost===data.id).amount+1})(dispatch)
      }else{
        addView({idpost:data.id, amount:1})(dispatch)
      }
    }
    }

  if(loading){
    return(
      <View style={styles.center}>
       <ActivityIndicator color="black"/>
      </View>
    )
  }

  if(posts.length==0){
    <Text style={styles.text}>Пока нет постов...</Text> 
  }

    return(
      <View style={styles.main}>
      <Text style={styles.text}>Категория: Анекдоты</Text>  
      {jokes.length!=0 ? <FlatList data={jokes} keyExtractor={elem => elem.id.toString()}
      renderItem={({item})=>{
          return(
              <PostList data={item} openPost={navToPage}/>
          )
      }}
    />:<View style={styles.center}><Text>Анекдотов нет...</Text></View>}
    
      </View>
    )
}

MainScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: () => {
    return (
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 20
        }}
      >
        Главная
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
})

const styles = StyleSheet.create({
  main: {
    flex: 1,
   padding:20
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