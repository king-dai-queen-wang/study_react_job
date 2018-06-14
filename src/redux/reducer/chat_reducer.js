import {USER_LIST, MSG_LIST, MSG_RECV, MSG_READ} from '../action_type'
const initState={
	userList:[],
	chatMsg:[],
	users:{},
	unRead:0
}
export default function chat(state=initState,action){
	switch(action.type){
		case USER_LIST:
			return {...state,userList:action.payload}
		case MSG_RECV:
			const n = action.payload.to === action.userid?1:0
			return {...state, chatMsg:[...state.chatMsg, action.payload],users:state.users, unRead:state.unRead+n}
		case MSG_LIST:
			return {...state, chatMsg:action.payload.data,users:action.payload.users, unRead:action.payload.data.filter(v=>!v.read&&v.to===action.payload.userid).length}
		case MSG_READ:
		default:
			return state
	}
}