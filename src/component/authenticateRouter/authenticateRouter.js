import React from 'react'
import axios from 'axios'
import { withRouter }from 'react-router-dom'
import {loadData} from '../../redux/actions/action'
import {connect} from 'react-redux'
@withRouter
@connect(null,{loadData})
class AuthRouter extends React.Component{
	constructor(props){
		super(props)
		console.log(this.props)
	}
	componentDidMount() {
		const publicList = ['/login','/register']
		const location = this.props.location.pathname
		if(publicList.indexOf(location)!==-1){
			return	
		}
		axios.get('/user/info').then((res)=>{
			if(res.status === 200){
				if(res.data.code===0){
					this.props.loadData(res.data.data)
				}else{
					this.props.history.push('/login')
				}
				
			}
		})
	}
	render() {
		return (
			null
		);
	}
}
export default AuthRouter