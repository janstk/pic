var APPID = "10000001";
var SECRET_ID = "AKIDNZwDVhbRtdGkMZQfWgl2Gnn1dhXs95C0";
var SECRET_KEY = "ZDdyyRLCLv1TkeYOl5OCMLbyH4sJ40wp";
var BUCKET = "testa";
var REQUEST_URL = "//web.image.myqcloud.com/photos/v2/";

function makeRequestUrl() {
	var sign = getAppSignV2(BUCKET, null, null);
	var requestURL = REQUEST_URL + APPID + "/" + BUCKET + "/0/";
	console.log("realurl = :" + requestURL)
	console.log("finalurl = : " + requestURL + "?sign=" + sign)
	return requestURL + "?sign=" + sign;
}

var getAppSignV2 = function(bucket, expired, userid) {
	var now = parseInt(Date.now() / 1000);
	var rdm = parseInt(Math.random() * Math.pow(2, 32));
	var puserid = '';
	userid = userid || '0';

	var appid = APPID,
		secretId = SECRET_ID,
		secretKey = SECRET_KEY;

	if (!appid.length || !secretId.length || !secretKey.length) {
		return "AUTH_SECRET_ID_KEY_ERROR";
	}

	if (typeof userid === 'string') {
		if (userid.length > 64) {
			return "AUTH_URL_FORMAT_ERROR";
		}
		if ('0' !== userid) {
			puserid = userid;
		}
	}
	
	expired = now + 60 * 1000 * 60;

	var plainText = 'a=' + appid + '&b=' + bucket + '&k=' + secretId + '&e=' + expired + '&t=' + now + '&r=' + rdm + '&u=0&f=test';
	console.log("plantext = " + plainText);
	var res = CryptoJS.HmacSHA1(plainText, secretKey);
	var baseOrg = Base64.encode(plainText);
	var orgWordArray = CryptoJS.enc.Base64.parse(baseOrg);
	var wordArray = res.concat(orgWordArray);
	var base64String = CryptoJS.enc.Base64.stringify(wordArray)
	console.log(base64String)
	return base64String;
}

function encodeUTF8(str) {
	var temp = "",
		rs = "";
	for (var i = 0, len = str.length; i < len; i++) {
		temp = str.charCodeAt(i).toString(16);
		rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
	}
}