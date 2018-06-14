import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose}from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Link, Redirect, Switch} from 'react-router-dom'
import './index.css';
import './test/es6.js'
import reducer from './redux/reducer/reducer.js'
import Login from './container/login/login.js'
import Dashboard from './component/dashboard/dashboard.js'
import Chat from './component/chat/chat.js'
import BossInfo from './container/boss/bossInfo'
import GeneiusInfo from './container/geneius/geneiusInfo'
import registerServiceWorker from './registerServiceWorker';
// import 'antd-mobile/dist/antd-mobile.css'
import './config.js'
import Register from './container/register/register'
import Boss from './container/boss/boss'
import AuthRouter from './component/authenticateRouter/authenticateRouter'
import './index.css'
const reduxDevTools = window.devToolsExtension ?window.devToolsExtension(): f=>f;
var store = createStore(reducer, compose(
	applyMiddleware(thunk),
	reduxDevTools
))


class Test extends React.Component{
	constructor(props){
		super(props)
		console.log(props)
	}
  	render(){
  		const props = this.props
    	return <h1>Test{props.match.url}</h1>
    }
}

ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRouter/>
				<Switch>
					<Route path='/' exact component={Login}/>
					<Route path='/login' exact component={Login}/>
					<Route path='/chat/:user' exact component={Chat}/>
					<Route path='/bossInfo' exact component={BossInfo}/>
					<Route path='/geneiusInfo' exact component={GeneiusInfo}/>
					<Route path='/register' exact component={Register}/>
					{/*<Route path='/:location' component={Test} />}*/}
					<Route component={Dashboard} />}
				</Switch>
				{/*{auth.auth?null:<Redirect to='/login'></Redirect>}*/}
				{/*<Redirect to='/'></Redirect>*/}
			</div>
		</BrowserRouter>
	</Provider>), document.getElementById('root'))

registerServiceWorker();
