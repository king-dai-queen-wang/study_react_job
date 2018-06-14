import {GET_ALL_DATA} from '../action_type.js'
const initState = {
	userName:'dww1',
	age:1
}
export default function test(state=initState,action){
  switch(action.type){
    case GET_ALL_DATA:
      return {...state,...action.payload}
    default:
      return state      
  }
}