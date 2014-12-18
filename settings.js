var port, ip;
switch(process.env.NODE_ENV) {
	case 'production':
		port = 3007;
		ip = '127.0.0.1';
		break;
	case 'development':
		port = 3007;
		ip = '127.0.0.1';
		break;
}
module.exports = {
	server: {
		port: port,
		ip: ip
	}
};
