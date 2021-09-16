import {ADD_COMMENT, ADD_COOKIE, ADD_POST, ADD_VIEW, DELCATEGORY_COMMENT, DELETE_COMMENT, DELETE_POST, LOAD_COMMENTS, LOAD_LOGIN, LOAD_POSTS, LOAD_VIEWS, UPDATE_VIEW} from '../types'
import { DB } from '../../db'

export const loadComments = () => {
  return async dispatch => {
    const comments = await DB.loadComments()
    dispatch({
      type: LOAD_COMMENTS,
      payload: comments
    })
  }
  
}

export const loadLogin = () => {
  return async dispatch => {
    const login = await DB.loadLogin()
    dispatch({
      type: LOAD_LOGIN,
      payload: login
    })
  }
  
}


export const loadViews = () => {
  return async dispatch => {
    const views = await DB.loadViews()
    dispatch({
      type: LOAD_VIEWS,
      payload: views
    })
  }
  
}

export const addView = (data) => {
  return async dispatch => {
    const id = await DB.addView(data)
    dispatch({
      type: ADD_VIEW,
      payload:{id:id,...data}
    })
  } 
}

export const updateView = (data) => {
  return async dispatch => {
   await DB.updateView(data)
    dispatch({
      type: UPDATE_VIEW,
      payload:data
    })
  } 
}

export const addsComment = (data) => {
  return async dispatch => {
    const id = await DB.addComment(data)
    dispatch({
      type: ADD_COMMENT,
      payload:{id:id,...data}
    })
  } 
}

export const deleteComment = (id) => {
  return async dispatch => {
   await DB.deleteComment(id)
    dispatch({
      type: DELETE_COMMENT,
      payload:id
    })
  } 
}

export const deletePost = (id) => {
  return async dispatch => {
   await DB.deletePost(id)
    dispatch({
      type: DELETE_POST,
      payload:id
    })
  } 
}

export const deleteCategoryComment = (id) => {
  return async dispatch => {
   await DB.deleteCatComment(id)
    dispatch({
      type: DELCATEGORY_COMMENT,
      payload:id
    })
  } 
}


export const addData = (data) => {
  return async dispatch => {
    const id = await DB.addData(data)
    dispatch({
      type: ADD_POST,
      payload:{id:id,...data}
    })
  } 
}


export const loadPosts= () => {
  return async dispatch => {
   const data = await DB.loadData()
   console.log(data,'data')
       dispatch({
          type: LOAD_POSTS,
          payload: data
        })  
  }
  
}

export const addCookie = (data) => {
  return async dispatch => {
    dispatch({
      type: ADD_COOKIE,
      payload:data
    })
  } 
}
