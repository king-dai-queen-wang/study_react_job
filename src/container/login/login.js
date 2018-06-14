import React from 'react'
import {login, logout, getAllData} from '../../redux/actions/action.js'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import Logo from '../../component/logo/logo.js'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import FormHelper from '../../component/other/formHelper'
function WrapHelloFn(Comp) {
	class WrapHelloFn extends Comp{
		componentWillMount() {
			console.log('WrapHelloFn--componentWillMount')
		}
		componentDidMount(){
			console.log('WrapHelloFn--componentDidMount')
		}
		render(){
			return (<div>
				<Comp {...this.props}></Comp>
				<p>haha</p>
			</div>)
		}
	}
	return WrapHelloFn
}

@WrapHelloFn
class Hello extends React.Component{
	componentWillMount() {
		console.log('Hello-- componentWillMount')
	}
	componentDidMount(){
		console.log('Hello--componentDidMount')
	}
	render(){
		return <p>hello React</p>
	}
}

@connect((state)=>({user:state.user}),{login, logout, getAllData})
@FormHelper
class Login extends React.Component{
	constructor(props){
		super(props)
		this.register = this.register.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}
	register = function(){
		this.props.history.push('/register')
	}
	handleLogin(){
		this.props.login(this.props.state)
	}
	componentWillMount(){
		this.props.getAllData()
	}
	render(){
		const login = <div>
			{this.props.user.redirctTo&&this.props.user.redirctTo!=='/login'?<Redirect to={this.props.user.redirctTo}></Redirect>:null}
			<Logo/>
			<Hello/>
			<WingBlank>
				<List>
					<InputItem onChange={(v)=>{this.props.handleChange('user',v)}}>userName</InputItem>
					<WhiteSpace/>
					<InputItem onChange={(v)=>{this.props.handleChange('pwd',v)}}>password</InputItem>
				</List>
				<WhiteSpace/>
				<Button type='primary' onClick={this.handleLogin}>Login</Button>
				<WhiteSpace/>
				<Button type='primary' onClick={this.register}>Register</Button>
			</WingBlank>
		</div>
		return (
		<div>
		{
			this.props.user.auth?<Redirect to='/dashboard'></Redirect>: login
		}
		</div>)
	}
}
export default Login