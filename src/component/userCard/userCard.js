import React from 'react'
import PropsTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter
class UserCard extends React.Component{
	
	static properTypes={
		userList:PropsTypes.array.isRequired
	}
	constructor(props){
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(param){
		debugger
		this.props.history.push('/chat/'+param._id)
	}
	render(){
		const {userList} = this.props
		return(userList.map(item=>(
				<WingBlank key={item._id} size="lg">
				    <WhiteSpace size="lg" />
				    <Card onClick={()=>{this.handleClick(item)}}>
				      <Card.Header
				        title={item.title}
				        thumb={item.avatar?require(`../../component/img/${item.avatar}.png`):null}
				        thumbStyle={{width:'50px'}}
				        extra={<span>this is extra</span>}
				      />
			      		<Card.Body>
			      		{
							item.desc?<div>{item.desc.split('\n').map(d=>(<span key={d}>{d}</span>))}</div>:null
			      		}
			      		{

			      			item.type=='boss'?<div>薪资:{item.salary}</div>:null
			      		}
				      	</Card.Body>
				      <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
				    </Card>
				    <WhiteSpace size="lg" />
			  	</WingBlank>
		)))
	}
}
export default UserCard