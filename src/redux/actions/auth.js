import {LOGIN_SUCCESS, LOGOUT, SUCCESS_MSG,LOAD_DATA,
 ERROR_MSG, REGISTER_SUCCESS, REGISTER_ERROR,AUTH_SUCCESS} from '../action_type.js'
import axios from 'axios'
export function login(param){
	const {user,pwd} = param
	if(!user||!pwd){
		return errorMsg('Please enter username or pwd')
	}
	return (dispatch=>{
		axios.post('/user/login',{user,pwd}).then(res=>{
			if(res.status===200 && res.data.code===0){
				dispatch(authSuccess(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		}).catch(err=>{
			dispatch(errorMsg(err))
		})
	})
}
export function logoutSubmit(){
	return ({type:LOGOUT})
}

export function saveInfo(param){
	return dispatch=>{
		axios.post('/user/saveInfo',param).then((res)=>{
			if(res.status===200 && res.data.code===0){
				dispatch(saveInfoSuccess(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		}).catch(e=>{
			dispatch(errorMsg(e))
		})
	}
}
export function saveInfoSuccess(param) {
	return { type: AUTH_SUCCESS,payload:param }
}
export function loadData(userInfo){
	return {type:LOAD_DATA,payload:userInfo}

}
export function logout(){
	return {type: LOGOUT}
}

export function authSuccess(msg) {
	return({type:AUTH_SUCCESS,payload:msg})
}
export function errorMsg(msg) {
	return({type:REGISTER_ERROR,msg:msg})
}
export function register({user,pwd,repeatPwd,type}){
	if(!user||!pwd||!repeatPwd||!type){
		return errorMsg('Please input the valid info')
	}
	if(pwd !== repeatPwd){
		return errorMsg('pwd is not same as repeatPwd')
	}
	return (dispatch=>{
		axios.post('/user/register',{user,pwd,type}).then(res=>{
			
			if(res.status===200 && res.data.code===0){
				dispatch(authSuccess({user,pwd,type}))
			}else{
				
				dispatch(errorMsg(res.data.msg))
			}
		}).catch(err=>{
			
			dispatch(errorMsg(err))
		})
	})
}