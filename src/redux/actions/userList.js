import{USER_LIST} from '../action_type'
import axios from 'axios'

function userList(data){
	return {type:USER_LIST,payload:data}
}
export function getUserList(type){
	return dispatch=>{
		axios.get('/user/list?type='+type).then(res=>{
			if(res.data.code === 0){
				dispatch(userList(res.data.data))
			}
		}).catch(e=>{
			console.log(e)
		})
	}
}