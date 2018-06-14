import {ADD_GUN, REMOVE_GUN} from '../action_type.js'
export default function gun(state=0,action){
  switch(action.type){
    case ADD_GUN:
      return state+1
    case REMOVE_GUN:
      return state-1
    default:
      return 10      
  }
}