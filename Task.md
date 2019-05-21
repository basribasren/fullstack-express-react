Cek response-time npm

import responseTime from 'response-time';
app.use(responseTime());

Cek Get IP
const getIP = req => {
	let ip = req.get('x-forwarded-for') || req.ip;

	if (ip && ip.includes(', ')) {
		ip = ip.split(', ')[0];
	}

	if (ip && ip.includes('::ffff:')) {
		ip = ip.replace('::ffff:', '');
	}

	return ip;
};

Cek jwt sign

const TOKEN_PAYLOAD = { email: 'store', scopes: ['admin'] };
const STORE_ACCESS_TOKEN = jwt.sign(TOKEN_PAYLOAD, serverSettings.jwtSecretKey);

Cek about migration

Cek about seeder

