import React from 'react'
import {Route} from 'react-router-dom' 
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile';
import NavLink from '../navLink/navLink'
import { Switch} from 'react-router-dom'
import Boss from '../../container/boss/boss'
import User from '../user/user'
import Genius from '../../container/geneius/genius'
import { getMsgList, receiveMsg } from '../../redux/actions/action'
function Msg(){
	return <h1>Msg</h1>
}

@connect((state)=>({user:state.user,chat:state.chat}),{getMsgList, receiveMsg})
class Dashboard extends React.Component{
	componentDidMount() {
		if(!this.props.chat.chatMsg.length){
			this.props.getMsgList()
			this.props.receiveMsg()
		}
	}
	render(){
		const pathName = this.props.location.pathname
		const navList = [{
				path:'/boss',
				title:'牛人页面',
				text:'Boss',
				component:Boss,
				icon: 'boss',
				hide: this.props.user.type === 'genius'
			},{
				path:'/geneius',
				title:'geneius页面',
				text:'Geneius',
				component:Genius,
				icon: 'job',
				hide: this.props.user.type === 'boss'
			},{
				path:'/msg',
				title:'msg页面',
				text:'msg',
				component:Msg,
				icon: 'msg'
			},{
				path:'/me',
				title:'me页面',
				text:'Me',
				component:User,
				icon: 'me'
			}]
		return (
			<div>
				<NavBar
				className='fixed-header'
		      		mode="dard"
      			>{navList.find(v=>(v.path===pathName)).title}</NavBar>
      			<div style={{marginTop:45}}>
	       			<Switch>
	      				{navList.map(item=>(
	      					<Route key={item.path} path={item.path} component={item.component}></Route>
	      				))}
	      			</Switch>     				
      			</div>

      			<NavLink data= {navList}/>
			</div>
			
		)
	}
}
export default Dashboard