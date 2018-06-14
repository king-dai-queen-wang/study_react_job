import {LOGIN_SUCCESS, LOGOUT,LOAD_DATA,
  REGISTER_SUCCESS,REGISTER_ERROR, AUTH_SUCCESS} from '../action_type.js'
import {redirctPath} from '../tool/redirct'
const initState = {
	user:'',
	pwd:'',
	type:'',
	msg:''
}
export default function user(state=initState,action){
  switch(action.type){
    case AUTH_SUCCESS:
      return {...state,redirctTo:redirctPath(action.payload), ...action.payload}
    case LOGOUT:
      return {...initState, redirctTo:'/login'}
    case REGISTER_ERROR:
    	return {...state,isAuth:false,msg:action.msg}
    case LOAD_DATA:
      return {...state, ...action.payload}
    default:
      return state
  }
}