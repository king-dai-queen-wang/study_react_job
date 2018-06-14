import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/actions/action'
import {Redirect} from 'react-router-dom'
import FormHelper from '../../component/other/formHelper'

@connect(state=>({user:state.user}),{register})
@FormHelper
class Register extends React.Component{
	constructor(props){
		super(props)
		this.handleRegister = this.handleRegister.bind(this)
	}
	componentDidMount() {
		this.props.handleChange('type','genius')
	}
	handleRegister(){
		console.log(this.props.state)
		this.props.register(this.props.state)
	}
	render() {
		const RadioItem = Radio.RadioItem
		return (
			<div>
			{this.props.user.redirctTo?<Redirect to={this.props.user.redirctTo}></Redirect>:null}
			<Logo/>
			<WingBlank>
				<List>
					{this.props.user.msg?<p className='error-msg'>{this.props.user.msg}</p>:null}
					<InputItem onChange={v=>{this.props.handleChange('user',v)}}>userName:</InputItem>
					<WhiteSpace/>
					<InputItem type='password' onChange={v=>{this.props.handleChange('pwd',v)}}>Password:</InputItem>
					<WhiteSpace/>
					<InputItem type='password' onChange={v=>{this.props.handleChange('repeatPwd',v)}}>Repeat Password:</InputItem>
				</List>
				<WhiteSpace/>
				<RadioItem checked={this.props.state.type==='genius'}
					onClick={()=>{this.props.handleChange('type','genius')}}
				>Genius</RadioItem>
				<RadioItem checked={this.props.state.type==='boss'}
					onClick={()=>{this.props.handleChange('type','boss')}}
				>Boss</RadioItem>
				<Button type='primary' onClick={this.handleRegister}>Register</Button>
			</WingBlank>	
			
			</div>
		);
	}
}
export default Register