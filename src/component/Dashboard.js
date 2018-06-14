import React from 'react'
import App from './App';
import {Link, Route, Switch} from 'react-router-dom'
import {logout} from '../redux/actions/action.js'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
function QiBingLian(){
  return <h1>QiBingLian</h1>
}

class Battalion extends React.Component{
  	render(){
    	return <h1>Battalion leader</h1>
    }
}

@connect((state)=>({auth:state.auth}),{logout})
class Dashboard extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		const props = this.props
		const App_render = <div>
				<ul>
					<li><Link to='${props.match.url}/'>一营</Link></li>
					<li><Link to='${props.match.url}/eryin'>二英</Link></li>
					<li><Link to='${props.match.url}/sanyin'>三营</Link></li>
				</ul>
				{
					this.props.auth.auth?<button onClick={()=>{this.props.logout()}}>logout</button>: null
				}
				<Route path={`${props.match.url}/`} exact component={App}/>
				<Route path={`${props.match.url}/eryin`} exact component={QiBingLian}/>
				<Route path={`${props.match.url}/sanyin`} exact component={Battalion}/>
			</div>
		const redirctToLogin = <Redirect to='/login'></Redirect>
		return (this.props.auth.auth?App_render: redirctToLogin)
				
	}
}
export default Dashboard