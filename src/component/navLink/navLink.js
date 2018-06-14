import React from 'react'
import PropsTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
@withRouter
@connect(state=>({chat:state.chat}))
class NavLink extends React.Component{
	static propType={
		data: PropsTypes.array.isRequired
	}
	render(){
		const navList = this.props.data.filter(v=>!v.hide)
		const  unReadMsgNum = this.props.chat.unRead
		const {pathname} = this.props.location
		debugger
		return (
			<div>
				<TabBar>
					{navList.map(item=>(
					<TabBar.Item
						badge={item.path==='/msg'?unReadMsgNum:null}
						title={item.title}
			            key={item.title}
			            icon={{uri:require(`../img/${item.icon}.png`)}}
			            selectedIcon={{uri:require(`../img/${item.icon}.png`)}}
			            selected={pathname===item.path}
			            onPress={()=>{
			            	this.props.history.push(item.path)
			            }}
					></TabBar.Item>))
					}
				</TabBar>
			</div>
			)
	}
}
export default NavLink