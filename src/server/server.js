const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
require('./models/connection')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const userRouter = require('./controller/user')
const model = require('./models/model');
const Chat = model.getModel('chat')
Chat.remove({},function(e,d){})
io.on('connection', function(socket){
	console.log('user login');
	socket.on('sendMsg', function(data){
		console.log(data);
		const { from, to, msg}  = data
		const chatid = [from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msg}).then(doc=>{
			io.emit('receiveMsg',Object.assign({},doc._doc))
		}).catch(err=>{

		})
		
	})
})



app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(9093, function () {
	console.log('Node start in 9093')
})