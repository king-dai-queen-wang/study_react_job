import {GET_ALL_DATA} from '../action_type.js'
import axios from 'axios'
export function getAllData() {
	return dispatch=>{
		axios.get('/user/getAllData').then((res)=>{
			if(res.status===200){
				dispatch({type: GET_ALL_DATA, payload: res.data})
			}
		})
	}
} 