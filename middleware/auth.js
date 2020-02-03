const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	const token = req.header('x-auth-token');

	if (!token) {
		res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		const decode = jwt.verify(token, config.get('jwtSecert'));
		req.user = decode;
		next();
	} catch (error) {
		console.error(error);
		res.status(401).json({ msg: 'Token is not valid' });
	}
};