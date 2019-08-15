const jwt 	= require('jsonwebtoken')

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization')
	// checking if there is any Authorization in req
	if (!authHeader) {
		req.isAuth = false;
		return next();
	}
	// splitting the token 
	const token = authHeader.split(' ')[1]
	if ( !token || token === '') {
		req.isAuth = false;
		return next();
	}
	//verify the token with sceret key
	let receiveToken
	try {
		receiveToken = jwt.verify(token, 'usingjsonwebtokenfortoken')
	} catch (err) {
		req.isAuth = false;
		return next();
	}

	if(!receiveToken) {
		req.isAuth = false;
		return next();
	}
	req.isAuth = true;
	req.userId = receiveToken.userId;
	next();
}