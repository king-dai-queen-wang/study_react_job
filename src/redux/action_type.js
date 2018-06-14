import io from 'socket.io-client'
export const ADD_GUN = 'ADD_GUN'
export const REMOVE_GUN = 'REMOVE_GUN'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const GET_ALL_DATA = 'GET_ALL_DATA'

export const ERROR_MSG = 'ERROR_MSG'
export const SUCCESS_MSG = 'SUCCESS_MSG'

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'

export const LOAD_DATA = 'LOAD_DATA'

export const AUTH_SUCCESS = 'AUTH_SUCCESS'

export const USER_LIST = 'USER_LIST'


export const socket = io('ws://localhost:9093')
export const MSG_LIST = 'MSG_LIST'
export const MSG_RECV = 'MSG_RECV'
export const MSG_READ = 'MSG_READ'