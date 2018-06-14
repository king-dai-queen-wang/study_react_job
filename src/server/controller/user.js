const express= require('express')
const Router = express.Router()
const model = require('../models/model');
const User = model.getModel('user')
const Chat = model.getModel('chat')

Router.post('/saveInfo', function(req,res){
	const {userid} = req.cookies
	const body = req.body
	if(!userid){
		return res.dumps({code:1})
	}
	
	User.findByIdAndUpdate(userid,body).then(d=>{
		const data = Object.assign({
			user:d.user,
			type:d.type
		},body)
		return res.json({code:0,data:data})
	}).catch(e=>{
		return res.json({code:1,msg:e.message})
	})
})

Router.get('/info', function(req,res){
	const {userid} = req.cookies
	if(!userid){
		return res.json({code:1})
	}
	User.findOne({_id:userid}).then(d=>{
		return res.json({code:0,data:d})
	}).catch(e=>{
		return res.json({code:1,msg:e.message})
	})
})
Router.get('/getMsgList', function(req,res){
	const {userid} = req.cookies
	if(!userid){
		return res.json({code:1})
	}
	let user = {}
	User.find({}).then(d=>{
		d.forEach(v=>{
			user[v._id] = {name:v.user,avatar:v.avatar}
		})
	}).then(()=>{return Chat.find({$or:[{from:userid},{to:userid}]})})
	.then(d=>{return res.json({code:0,data:d, users:user})})
	.catch(e=>{
		return res.json({code:1,msg:e.message})
	})
})
Router.get('/deleteAllData', function (req, res) {
	User.remove({},function (err, doc) {
		if(!err){
			console.log(doc)
			res.send(doc)
		}else{
			console.log(err);
		}
	})
})
Router.get('/list', function (req, res) {
	const {type} = req.query
	User.find({type},function (err, doc) {
		if(!err){
			console.log(doc)
			res.json({code:0,data:doc})
		}else{
			console.log(err);
		}
	})
})

Router.post('/login', function (req, res) {
	let param = req.body
	console.log(param)
	const {user,pwd} = param
	User.findOne({user,pwd}).then(d=>{
		if(!d){
			return res.json({code:1,msg:'login failed, need to register'})
		}
		res.cookie('userid',d['_id'])
		return res.json({code:0,data:d,msg:'login success'})
	}).catch(e=>{
		res.json({code:1, msg:e.message})
	})
	
})
Router.post('/register', function (req, res) {
	let param = req.body
	console.log(param)
	const {user,pwd,type} = param
	User.findOne({user}).then(d=>{
		if(d){
			return res.json({code:1,msg:'user exit'})
		}else{
			const userModel = new User({user,type,pwd})
			userModel.save(param).then(d=>{
				const {user,type,_id} = d
				res.cookie('userid',_id)
				return res.json({code:0,payload:{user,type,_id},msg:'Create Success'})
			}).catch(err=>{
				return res.json({code:1,msg:err.message})
			})
			/*User.create(param).then(d=>{
				return res.json({code:0,payload:d,msg:'Create Success'})
			}).catch(err=>{
				return res.json({code:1,msg:err})
			})*/
		}
	}).catch(e=>{
		res.json({code:1, msg:e.message})
	})
	
})
Router.get('/createData', function (req, res) {
	User.create({
		userName:'dww',
		age:23
	},function (err, doc) {
		if(!err){
			console.log(doc)
			res.send(doc)
		}else{
			console.log(err);
		}
	})
})
Router.get('/getAllData', function (req, res) {
	User.find({},function (err, doc) {
		if(!err){
			console.log(doc);
			return res.json(doc)
		}else{
			console.log(err);
		}
		
	})
})
Router.get('/updateData', function (req, res) {
	User.update({userName:'dww'},{'$set':{age:29}},function (err, doc) {
		if(!err){
			console.log(doc);
			return res.json(doc)
		}else{
			console.log(err);
		}
		
	})
})
module.exports = Router