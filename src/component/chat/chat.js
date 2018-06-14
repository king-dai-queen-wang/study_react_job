import React from 'react'
import {getChatId} from '../../redux/tool/redirct'
import {List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import {socket} from '../../redux/action_type'
import { connect } from 'react-redux'
import { getMsgList ,sendMsg,receiveMsg } from '../../redux/actions/action'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

@connect((state)=>({chat:state.chat,user:state.user}),{getMsgList, sendMsg, receiveMsg})
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state={
			text: '',
			msg: [],
			style:{width:'100%',display:'none'}
		}
	}
	moneyKeyFn(e){
		if(e.keyCode===13){
			this.handleSubmit()
		}
	}
	toggleEmoji(){
		if(this.state.style.display==='none'){
			this.setState({style:{width:'100%',display:'block'}})	
		}else{
			this.setState({style:{width:'100%',display:'none'}})
		}
	}
	setEmoji(emoji){
		this.setState({text:this.state.text+emoji.native})
		this.toggleEmoji()
	}
	handleSubmit(){
		// socket.emit('sendMsg',{text:this.state.text})
		// this.setState({text:''})
		let param = {
			from:this.props.user._id,
			to:this.props.match.params.user,
			msg:this.state.text
		}

		this.props.sendMsg(param)
		this.setState({text:''})
	}
	componentDidMount() {
		if(!this.props.chat.users.length>0){
			this.props.receiveMsg()
			this.props.getMsgList()
		}
		
		// socket.on('recvmsg',(data) =>{
		// 	this.setState({msg: [...this.state.msg,data.text]})
		// })
	}
	render(){
		const userid = this.props.match.params.user
		const users = this.props.chat.users
		const chatid = getChatId(userid, this.props.user._id)
		const chatMsg = this.props.chat.chatMsg.filter(v=>v.chatid===chatid)
		//const buf = emoji.split('').filter(v=>v).map(v=>({text:v}))
		if(!users[userid]){
			return null
		}
		return (
			<div id='chat-page'>
				<NavBar model='dark'
					icon={<Icon type='left'/>}
					onLeftClick={this.props.history.goBack}
					>
					{
						`和${users[userid].name}的聊天`
					}
				</NavBar>
				{
					this.props.chat.chatMsg.map(item=>{
						const avatar = require(`../img/${users[item.from].avatar}.png`)
						return item.from=== userid?
						(<List.Item thumb={avatar} key = {item._id}>对方发来的: {item.content}</List.Item>)
						:(<List.Item extra={<img src={avatar}/>} className='chat-me' key = {item._id}>我发送的: {item.content}</List.Item>)
					})
				}
				
				<div className='stick-footer'>
					<List>
					<Picker 
					 style={this.state.style}
					 onSelect={(emoji)=>{this.setEmoji(emoji);this.inputRef.focus()}}/>
					<InputItem
						placehodler='请输入'
						value={this.state.text}
						ref={el => this.inputRef = el}
						onChange={(v)=>{this.setState({text:v})}}
						extra={<span>
								<span onClick={()=>this.handleSubmit()}>发送</span>
							</span>
							}
       	 				onKeyUp={(e)=>{this.moneyKeyFn(e)}}	
					><span onClick={()=>this.toggleEmoji()}>emoji</span></InputItem>
					</List>
					
					
					{/*<Grid data={emoji} columnNum={9} carouselMaxRow={4} isCarousel={true}/>*/}
				</div>
			</div>)
	}
}
export default Chat