import axios from 'axios'
import {MSG_LIST, MSG_RECV, MSG_READ,socket} from '../action_type' 
export function getMsgList(){
	return (dispatch,getState)=>{
		axios.get('/user/getMsgList').then(res=>{
			if(res.status === 200 && res.data.code===0){
				const userid = getState().user._id
				dispatch(msgList(res.data.data, res.data.users, userid))
			}
		})
	}
}
export function receiveMsg(){
	return (dispatch,getState)=>{
		socket.on('receiveMsg',function(data){
			console.log(data)
			const userid = getState().user._id
			dispatch(msgRecv(data, userid))
		})
	}
}
export function sendMsg({from,to,msg}){
	return dispatch=>{
		// axios.post('/user/sendMsg',{from,to,text}).then(res=>{
		// 	if(res.status === 200 && res.data.code===0){
		// 		dispatch(sendMsg(res.data.msgs))
		// 	}
		// })
		socket.emit('sendMsg',{from,to,msg})
	}
}
function msgRecv(data, userid){
	return {type:MSG_RECV, payload: data,userid}
}
function msgList(data, users, userid){
	return {type:MSG_LIST, payload: {data,users,userid}}
}
