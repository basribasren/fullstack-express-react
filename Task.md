CRASH ON UPDATE ACCOUNT

cek RPC-style

cek HATEOAS
Hypermedia as the Engine of Application State is a principle that hypertext links should be used to create a better navigation through the API.
https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/API-Design-on-the-scale-of-Decades.pdf
https://pages.apigee.com/rs/351-WXY-166/images/apigee-ebook-api-mgmt-2015-07.pdf
https://www.sans.org/cyber-security-summit/archives/file/summit-archive-1510001675.pdf
https://www.globallogic.com/wp-content/uploads/2017/08/Microservice-Architecture-API-Gateway-Considerations.pdf

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

Cek about migration

cek load balancing
https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts
http://nginx.org/en/docs/http/load_balancing.html
https://socket.io/docs/using-multiple-nodes/

caching server
Use a caching server like Varnish or Nginx (see also Nginx Caching) to greatly improve the speed and performance of your app.
https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/
https://varnish-cache.org/


8. Filter, Search and Sort

api service dicovery

client-side load balancing

api registry - for documentation

api gateway - seperate logic and security

cek for express-gateway framework