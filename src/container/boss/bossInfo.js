import React from 'react'
import { NavBar, Icon, InputItem,TextareaItem,Button } from 'antd-mobile';
import AvatarSelecter from '../../component/avatar-select/avatar-selecter';
import {saveInfo} from '../../redux/actions/action'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
@connect((state)=>({user:state.user}),{saveInfo})
class BossInfo extends React.Component{
	constructor(props){
		super(props)
		this.state = {
	    title: '',
	    companyName: '',
	    salary: '',
	    desc:'',
	    avatar:'',
      position:''
	  }
	  this.saveInfo = this.saveInfo.bind(this)
	}
	saveInfo(){
		this.props.saveInfo(this.state)
	}
  handleChange (k,v) {
    this.setState({
      [k]: v,
    });
  }
  selectAvatar(ele){
  	this.setState({avatar:ele})
  }
  render() {
  		const path = this.props.location.pathname
  		const redirect = this.props.user.redirctTo
  	 return (<div>
  	 	{redirect&&redirect!==path?<Redirect to={redirect}></Redirect>:null}
    	<NavBar mode="dark">compleate Boss Info</NavBar>
      <AvatarSelecter selectAvatar={(ele)=>this.selectAvatar(ele)}/>
      <InputItem onChange={(v)=>this.handleChange('position',v)}>Position</InputItem>
      <InputItem onChange={(v)=>this.handleChange('companyName',v)}>Company Name</InputItem>
      <InputItem onChange={(v)=>this.handleChange('salary',v)}>Salary</InputItem>
      <TextareaItem 
      	onChange={(v)=>this.handleChange('desc',v)}
      	rows={3}
      	title='Desc'
      	autoHeight>Desc</TextareaItem>
      	<Button type='primary' onClick={this.saveInfo}>Save</Button>
    </div>);
  }
}
export default BossInfo