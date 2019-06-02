Server on ERROR HANDLER

server.on('error', onError);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

----
devconnector have usefull schema

---
express-api-ex6-starter have usefull api docs configuration

---
express-rest-api have use full validation-params

---
express-cart have usefull feature

---


cek HATEOAS
Hypermedia as the Engine of Application State is a principle that hypertext links should be used to create a better navigation through the API.
https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/API-Design-on-the-scale-of-Decades.pdf
https://pages.apigee.com/rs/351-WXY-166/images/apigee-ebook-api-mgmt-2015-07.pdf
https://www.sans.org/cyber-security-summit/archives/file/summit-archive-1510001675.pdf
https://www.globallogic.com/wp-content/uploads/2017/08/Microservice-Architecture-API-Gateway-Considerations.pdf

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


 logging (morgan vs winston)
    validation (express-validator, joi)
    auth (passport jwt, local, social)
    session storage (redis vs keeping it in database?)
    database (mongo/mongoose vs pg/knex/bookshelf/sequelize, graphql)
    storage (s3 vs gcs)
    ajax requests (request vs axios)
    mail (mailgun, sendgrid, mailchimp)
    error handlers
    rate limiting
    geo ip


     body-parser
    compression
    serve-favicon
    express-session
    csurf
    helmet
    cors
    dotenv
    moment
    selfsigned
    chalk
    debug
