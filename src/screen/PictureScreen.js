import React,{useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, Dimensions,ActivityIndicator} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useSelector } from 'react-redux'
import { PostList } from '../components/PostList'

export const PictureScreen = ({navigation}) =>{

  useEffect(()=>{
console.log(posts,'POST')
  },[])

  const posts= useSelector(state => state.post.posts)
  let pictures =[]
  if(posts.length!==0){
 pictures = posts.filter(el=>el.category==='picture')
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
        <Text style={styles.text}>Категория: Мемасики</Text>  
      {pictures.length!=0 ? <FlatList data={pictures} keyExtractor={elem => elem.id.toString()}
      renderItem={({item})=>{
          return(
             <PostList data={item} openPost={navToPage}/>
          )
      }}
    />:<View style={styles.center}><Text>Мемасиков нет...</Text></View>}
    
      </View>
    )   
}
PictureScreen.navigationOptions = ({ navigation }) => {
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
          Картинки
        </Text>
      );
    },
      headerLeft: ()=>
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
