export function redirctPath({type,avatar}) {
	let userPath = (type==='boss'?'/boss':'/geneius')
	
	if(!avatar){
		userPath+='Info'
	}
	return userPath
}
export function getChatId(userId, targetId){
	return [userId,targetId].sort().join('_')
}