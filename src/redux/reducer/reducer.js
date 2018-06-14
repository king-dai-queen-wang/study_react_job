import user from './user_reducer.js'
import gun from './gun_reducer.js'
import test from './test_reducer.js'
import chat from './chat_reducer.js'
import {combineReducers} from 'redux'

export default combineReducers({user, gun, test, chat})