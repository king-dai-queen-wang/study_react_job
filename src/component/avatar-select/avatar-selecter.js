import React from 'react'
import {Grid, List} from 'antd-mobile'
import ProperTypes from 'prop-types'
class AvatarSelecter extends React.Component{
	static propTypes={
		selectAvatar: ProperTypes.func.isRequired
	}
	constructor(props){
		super(props)
		this.state={}
	}
	render(){
		const avatarList = '1,2,3,4,5,6'.split(',').map(v=>({
			icon:require(`../img/${v}.png`),
			text:v
		}))
		const avatar = this.state.icon?<div style={{marginTop:'45px'}}>
				<span>selected avatar:</span>
				<img style={{width:20}} src={this.state.icon}/>
			</div>:<div>please select avatar</div>
		return (<div>
			<List renderHeader={()=>avatar}>
				<Grid onClick={ele=>{
					this.setState(ele)
					this.props.selectAvatar(ele.text)}}
					data={avatarList}/>
			</List>
			
		</div>)
	}
}
export default AvatarSelecter