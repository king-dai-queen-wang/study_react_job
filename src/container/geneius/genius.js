import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions/action'
import UserCard from '../../component/userCard/userCard'

@connect(state=>({userList:state.chat.userList}),{getUserList})
class Genius extends React.Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.getUserList('boss')
	}
	render(){
		console.log(this.props.userList)
		return (<UserCard userList = {this.props.userList}></UserCard>)
	}
}
export default Genius