import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions, TextInput, Alert, Button} from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { addsComment, deleteCategoryComment, deleteComment, deletePost } from '../store/actions/post'


export const PageScreen = ({navigation}) =>{
    const [text,setText] = useState('')
    const [name,setName] = useState('')
    const data = navigation.getParam('data')  
    const content = navigation.getParam('content')  
    const dispatch = useDispatch()

    const views = useSelector(state => state.post.views)
    const thisViews = views.find(el=>el.idpost===data.id) ? views.find(el=>el.idpost===data.id).amount : 0
    const comments = useSelector(state => state.post.comments)
    const postComments = comments.filter(el=>el.idpost==data.id)
    const cookie = useSelector(state => state.post.cookie) === "admin123" ? useSelector(state => state.post.cookie) : null



    const addComment =()=>{
        if(name==='' || text===''){
         Alert.alert('Пустое поле! Введите данные!')
         return false
        }
        let time = new Date()
        time=time.toLocaleString()
        const datas ={name:name,comment:text, time:time, idpost:data.id}
       addsComment(datas)(dispatch)
       setName('')
       setText('')
       
    }

    const removeComment=async(id)=>{
    if(cookie==='admin123'){
     deleteComment(id)(dispatch)
    }else{
        return false
    }
}

const removePost=async(id)=>{
    await deleteCategoryComment(id)(dispatch)
    await deletePost(id)(dispatch)
    navigation.navigate('Mains')
}

    return(
        <ScrollView>
        <View style={styles.center}>
            {content}
        <View marginBottom={15}>    
          <Text style={styles.views}>Просмотры: {thisViews}</Text>
        </View>   
        {cookie&&<Button title="Удалить пост" color="black" onPress={()=>removePost(data.id)}/>}
        <View style={styles.block}>
          <View> 
            <TextInput placeholder="Ваше имя..." width={Dimensions.get('window').width/2} value={name} multiline onChangeText={setName}/>
            <TextInput placeholder="Оставьте комментарий..." width={300} value={text} multiline onChangeText={setText}/>
          </View>
            <Icon name='sc-telegram' type='evilicon' size={50} onPress={addComment} color="black"/>
            </View>
            <Text style={styles.title}>Комментарии:</Text>
            <View>
            {postComments.length!==0 ? 
            postComments.map(el=>
            <TouchableOpacity key={el.id.toString()} activeOpacity={0.7} onPress={()=>removeComment(el.id)}>
            <View marginVertical={10}>
            <Text>Пользователь: {el.name}</Text>
            <Text>"{el.comment}"</Text>
            <Text>{el.time}</Text>
           </View>
           </TouchableOpacity>) : <Text>Комментриев пока нет...Будьте первым!</Text>
        }
        </View> 
        </View>
        </ScrollView>
    )
}

PageScreen.navigationOptions = ({ navigation }) => {

  const data = navigation.getParam('data')  
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
               {data.category}
              </Text>
            );
          },
}
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding:10,
    fontFamily:'open-regular'
  },
  block:{
    flexDirection:"row",
    alignItems:"center",
    marginVertical:20
  },
  title:{
    color:"grey",
    fontFamily:'open-regular',
    fontSize: 20
},
  image:{
    width:3*Dimensions.get('window').width/2,
    height:3*Dimensions.get('window').height/2,
  },
  views:{
    color:"grey",
    fontFamily:'open-regular',
    fontSize: 10
},
})
