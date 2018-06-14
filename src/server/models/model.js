const mongoose = require('mongoose')

const models= {
	user:{
		user:{type: String, require: true},		
		pwd:{type: String, require: true},
		type:{type: String, require: true},

		avatar: {type:String},
		desc:{type: String },
		title:{type: String },
		position:{type:String},
		companyName:{type: String },
		salary:{type: String }
	},
	chat:{
		'chat_id':{'type': String, require: true},
		'read':{type:Boolean, default: false},
		'from':{type:String, require: true},
		'to': {type:String, require: true},
		'content': {type: String, require: true, default:''},
		'create_time': {type:Number, default:new Date().getTime()}
	}
}
for(let i in models){
	mongoose.model(i,new mongoose.Schema(models[i]))
}

module.exports = {getModel: function(name){
	return mongoose.model(name)
}}