import React from 'react'
import {connect} from 'react-redux'
import {getUserList,logout,logoutSubmit} from '../../redux/actions/action'
import {List, Result, Icon } from 'antd-mobile';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import browserCookies from 'browser-cookies'
import {Redirect} from 'react-router-dom'
@connect(state=>({user:state.user}),{logoutSubmit})
class User extends React.Component{
	constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
	}
	componentDidMount(){
	}
	logout(){
		const alertInstance = Modal.alert('Logout', 'Are you sure???', [
		    { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
		    { text: 'OK', onPress: () => {
		    	browserCookies.erase('userid');
		    	this.props.logoutSubmit()}},
		  	]);
	}
	render(){
		const {user} = this.props
		const Item = List.Item
		const Brief = Item.Brief
		return (user?user.redirctTo==='/login'?<Redirect to={user.redirctTo}></Redirect>:<div>
						<Result
						    img={<img width="50px" src={user.avatar?require(`../img/${user.avatar}.png`):null}/>}
						    title={user.user}
						    message={user.type==='boss'?user.company:null}
						  />
						  <List renderHeader={() => '简介'}>
						  	<Item>
							  	{user.title}
							  	{user.desc?user.desc.split('\n').map(v=>(
									<Brief key={v}>{v}</Brief>
							  	)):null}
							  	{
							  		user.salary?<div>薪资：{user.salary}</div>:null
							  	}						  	
							</Item>
						  </List>
						  <WhiteSpace/>
						  	<List>
						  		<Item onClick={this.logout}>
						  			退出登录
						  		</Item>
						  	</List>
					</div>:null)
	}
}
export default User