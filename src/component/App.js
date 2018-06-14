import React from 'react'
import {Button} from 'antd-mobile'
import { List } from 'antd-mobile';
import {connect} from 'react-redux'
import {addGun, removeGun, addGunAsync} from '../redux/actions/action.js'
const Item = List.Item;

/*const mapStateToProps = function(state){
  return {
    guns: state
  }
}
const mapActionsToProps= {addGun, removeGun, addGunAsync}
*/
// App = connect(mapStateToProps,mapActionsToProps)(App)
@connect(state=>({guns: state.gun}),{addGun, removeGun, addGunAsync})

class App extends React.Component{
  constructor(props){
    console.log('constructor')
    super(props)
    this.state={
      army: ['dw','ww','wwdq','wd']
    }
  }
  componentWillReceiveProps(){
    console.log('componentWillReceiveProps')
  }
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate')
    return true
  }
  componentWillUpdate(){
    console.log('componentWillUpdate')
  }
  componentWillMount(){
    console.log('componentWillMount')
  }
  componentDidMount(){
    console.log('componentDidMount')
  }
  componentDidUpdate(){
    console.log('componentDidUpdate')
  }
  componentDidMount(){
    console.log('componentDidMount')
  }
  addGun(props){
    this.props.addGun()
  }
  removeGun(props){
    this.props.removeGun()
  }
  addGunAsync(props){
    this.props.addGunAsync()
  }
  render(){
    const boss = 'liYunLong'
    const props = this.props;
    const gun = this.props.guns
    console.log('render')
    return (
      <div>
        <Button type='primary' onClick={this.addGun.bind(this,props)}>add</Button> 
        <Button type='primary' onClick={this.removeGun.bind(this,props)}>remove</Button> 
        <Button type='primary' onClick={this.addGunAsync.bind(this,props)}>addAsync</Button>    
        <h1>hello world{boss}{gun}</h1>
      </div>
    )
  }
}




export default App