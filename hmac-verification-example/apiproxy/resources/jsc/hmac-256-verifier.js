var signatureVerified = false
var apiSecret =context.getVariable("verifyapikey.Verify-API-Key-1.client_secret");
var httpmethod = context.getVariable("request.verb");
var uri = context.getVariable('request.uri');
var accessToken = context.getVariable('request.header.Authorization').replace("Bearer ","");
var timestamp = context.getVariable('request.header.X-Timestamp');
var hashBody = CryptoJS.SHA256(context.getVariable('request.content'));

var clearString = httpmethod +":"+ uri +":"+ accessToken +":"+ hashBody +":"+ timestamp;
var hash = CryptoJS.HmacSHA256(clearString, apiSecret);
var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

if(hashInBase64 == context.getVariable('request.header.X-Signature')) {
    signatureVerified = true;
}

context.setVariable('signatureVerified',signatureVerified)