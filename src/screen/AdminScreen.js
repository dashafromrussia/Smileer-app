import React,{useState,useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView, Button, TextInput, Image, Alert, Dimensions} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker'
import { addCookie, addData } from '../store/actions/post'
import { useDispatch,useSelector } from 'react-redux'

export const AdminScreen = ({navigation}) =>{
const dispatch = useDispatch()   
const [picture,setPicture] = useState(null)    
const [describe,setDescribe] = useState('')
const [video,setVideo] = useState('')
const [modal,setModal] = useState(true)
const [checked, setChecked] = useState('joke')
const [visible,setVisible] = useState(false)
const [visivideo,setVisivideo] = useState(false)
const [display,setDisplay] = useState(true)
const [password,setPassword] = useState('')
const [name,setName] = useState('')



const login = useSelector(state => state.post.login)

const cookie = useSelector(state => state.post.cookie)

useEffect(()=>{
 if(cookie!=='admin123'){
   setModal(true)
 }else{
   setModal(false)
 }
},[cookie])



useEffect(()=>{
   checked==='video'? setVisivideo(true) : setVisivideo(false)
   checked==='picture' ? setVisible(true) 
    : setVisible(false) 
   checked==='picture' ? setDisplay(false) 
    : setDisplay(true) 
},[checked])



      const comeIn =async()=>{
        if(password==='' || name===''){
            Alert.alert('Введите данные!')
            return false
        }
        if (login[0].name===name && login[0].password===password) {
          await AsyncStorage.setItem('@storage_Key',name)
          addCookie(name)(dispatch)
        }else{
            Alert.alert('Неправильные данные!')
        }
       
      }

      async function askForPermissions() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert('Ошибка', 'Вы не дали прав на доступ к фото')
          return false
        }
        return true
      }
      
      
        const takePhoto = async () => {
          const hasPermissions = await askForPermissions()
      
          if (!hasPermissions) {
            return
          }
          const img = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.All, 
            quality: 0.7,
            allowsEditing: true,
            aspect: [3, 4]
          })
          if (!img.cancelled) {
            setPicture(img['uri']);
          }
          setVisible(false)
           console.log(img,'img')
           console.log('state', picture)
        }

    const saveData =()=>{
        console.log(picture)
        let data
      if(checked==='video'){
          if(video===""){
              Alert.alert('Вставьте ссылку на видео!')
              return false
          }else if(describe===""){
            Alert.alert('Введите заголовок к видео!')
            return false
          }
          else{
            data ={category:checked,data:[{describe:describe,video:video}]}
          }
      }else if(checked==='picture'){
          if(picture===null){
              Alert.alert('Добавьте картинку!')
              return false
          }else{
            data = {category:checked,data:[{describe:picture}]}
        }  
      }else{
          if(describe===''){
              Alert.alert('Введите данные!')
              return false
          }else{
            data = {category:checked, data:[{describe:describe}]}
          }
      }
      console.log(data)
      addData(data)(dispatch)
      setDescribe('')
      setVideo('')
      setPicture(null)
 }


 const goOut =async()=>{
  const data = await AsyncStorage.setItem('@storage_Key',"0")
  addCookie("0")(dispatch)
 }
  
    return(
        <ScrollView>
        {modal&&<View style={styles.modal}>
            <View> 
            <TextInput placeholder="Введите логин......." fontSize={20} value={name} onChangeText={setName}/>
            </View>
            <View marginTop={10}>
            <TextInput placeholder="Введите пароль....." fontSize={20} value={password} onChangeText={setPassword}/>
            </View>
            <View marginTop={30}>
            <Button title='Войти' color='black' onPress={comeIn}/>
            </View>
         </View>}
          {!modal&&<View style={styles.center}>
            <Text style={styles.header}>Выберите категорию, которую хотите добавить.</Text>
            <View marginTop={20}>
             <View style={styles.block}>
              <Text style={styles.text}>Анекдоты</Text>  
              <RadioButton
                value="joke"
                status={ checked === 'joke' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('joke')}
               />
               </View>
               <View style={styles.block}> 
              <Text style={styles.text}>Картинки</Text> 
              <RadioButton
                value="picture"
                status={ checked === 'picture' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('picture')}
              />
             </View>
             <View style={styles.block}> 
              <Text style={styles.text}>Видео</Text> 
              <RadioButton
                value="video"
                status={ checked === 'video' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('video')}
              />
              </View>
              <View style={styles.block}> 
              <Text style={styles.text}>Статусы</Text> 
              <RadioButton
                value="status"
                status={ checked === 'status' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('status')}
              />
              </View>
            <View style={styles.block}> 
             <Text style={styles.text}>Цитаты</Text> 
             <RadioButton
                value="quote"
                status={ checked === 'quote' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('quote')}
              />
              </View> 
    </View>
    <View marginVertical={20}>
    {visible&&<Button title="Добавить картинку" onPress={takePhoto}/>}
    {picture&&<Image style={styles.image} source={{uri:picture}}/>}
    {visivideo&&<TextInput placeholder="Вставьте ссылку на youtube-видео..." value={video} multiline onChangeText={setVideo}/>}
    {display&&<TextInput placeholder="Введите шутку,цитату,статус,описание..." value={describe} multiline onChangeText={setDescribe}/>}
    <View marginTop={20}>
    <Button title='Сохранить' color="black" onPress={saveData}/>
    </View>
    <View marginTop={30}>
    <Button title='Выйти' color="red" onPress={goOut}/>
    </View>
    </View>
  </View>}
    </ScrollView>
    )
}
AdminScreen.navigationOptions = ({ navigation }) => {
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
          Admin
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
  center: {
    flex: 1,
    padding:15,
    fontFamily:'open-regular',
  },

  block:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    padding:5
  },
  text:{
    fontFamily:'open-regular',
    fontSize:20
  },
  header:{
    fontSize:18,
    fontFamily:'open-bold'
  },
  modal:{
      flex: 1,
      padding:10,
      alignItems:'center',
      fontFamily:'open-regular',
      justifyContent:'center',
      marginVertical:Dimensions.get('window').height/3
    },
    blockmod:{
      flexDirection:"row",
      marginVertical:20
    }
})

