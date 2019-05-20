import jwt from 'jsonwebtoken'

export const generateToken = user => {
	let token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '30s' })
	console.log(token)
	return token
}

export function verifyToken(req, res, next) {
	const token = req.header('x-auth-token')
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' })
	}
	try {
		let data = jwt.verify(token, process.env.SECRET)
		req.user = data.user
		next()
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' })
	}
}
