import {ADD_COMMENT, ADD_COOKIE, ADD_POST, ADD_VIEW, DELCATEGORY_COMMENT, DELETE_COMMENT, DELETE_POST, LOAD_COMMENTS, LOAD_LOGIN, LOAD_POSTS, LOAD_VIEW, LOAD_VIEWS, UPDATE_VIEW} from '../types'

const initialState = {
  posts:[],
  comments:[],
  login:[],
  views:[],
  cookie:"0",
  loading: true
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
case LOAD_POSTS:  
let data
if(action.payload.length!==0){
 data = action.payload.map(el=>{
   el.data=JSON.parse(el.data)
   return el
  })
  }else{
    data=[]
  }
return{
  ...state,
  posts:[...data],
  loading: false
} 
case ADD_POST:
  return{
    ...state,
    posts:[action.payload, ...state.posts]
  }
case LOAD_COMMENTS:
  return{
    ...state,
    comments:[...action.payload]
  } 
case ADD_COMMENT:
  return{
    ...state,
    comments:[action.payload,...state.comments]
  }
case LOAD_LOGIN:
  return{
    ...state,
    login:[...action.payload]
  }
case DELETE_COMMENT:
  return{
    ...state,
    comments:state.comments.filter((el)=>el.id!==action.payload)
  }  
  case DELETE_POST:
  return{
    ...state,
   posts:state.posts.filter((el)=>el.id!==action.payload)
  }  
  case DELCATEGORY_COMMENT:
    return{
      ...state,
      comments:state.comments.filter((el)=>el.idpost!==action.payload)
    } 
  case ADD_COOKIE:
    return{
      ...state,
      cookie:action.payload
    } 
  case LOAD_VIEWS:
    return{
      ...state,
      views:[...action.payload]
    }
  case ADD_VIEW:
    return{
      ...state,
      views:[...state.views,action.payload]
    }  
  case UPDATE_VIEW:
  return{
   ...state,
   views:state.views.map(el=>{
     if(el.idpost==action.payload.idpost){
       el.amount = action.payload.amount
     }
     return el
   })
  }
    default:
      return state
  }
}
