var http = require("http");
var Sentry = require("@sentry/node");

class MyTransport {
  captureEvent(event) {
    console.log("here is the error");
    return Promise.reject("429");
  }
}

Sentry.init({
  debug: true,
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  transport: MyTransport
});

//create a server object:
http
  .createServer(function(req, res) {
    res.write("Hi Practeon, Welcome!"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080

Sentry.captureMessage("Test Message");

