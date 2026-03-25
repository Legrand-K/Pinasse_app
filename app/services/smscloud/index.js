const https = require('https');

class messageCampaignResponse {
	id;
	smsCount;
	createdAt;
	failed;

	constructor(_response) {
		let data = JSON.parse(_response);
		if (typeof data === 'object' && data !== null) {
			if ('id' in data) this.id = data.id;
			if ('smsCount' in data) this.smsCount = data.smsCount;
			if ('createdAt' in data) this.createdAt = data.createdAt;
			if ('failed' in data) this.failed = data.failed;
		}
	}

	toJson() {
		return JSON.stringify(this);
	}
}

class messageBody {
	sender;
	content;
	dlrUrl;
	recipients = [];

	toJson() {
		return JSON.stringify(this);
	}
}

class smscloud {

	base_url = "api.smscloud.ci";
	token;
	sender;
	response = {};

	constructor() {
		this.base_url = 'api.smscloud.ci';
		this.sender = '';
		this.token = '';
	}

	sendSMS(_message, _recipients) {
		messageBody = new messageBody();
		messageBody.sender = this.sender;
		messageBody.content = _message;
		messageBody.recipients = _recipients;

		const data = messageBody.toJson();
		const options = {
			hostname: this.base_url,
			port: 443,
			path: '/v1/campaigns',
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json',
				'Content-Length': data.length
			}
		}

		const req = https.request(options, res => {
			res.on('data', d => {
				this.response = new messageCampaignResponse(d);
				console.log(this.response.toJson());
			})
		})

		req.on('error', error => {
			console.error(error)
		})

		req.write(data)
		req.end();

	}
}

module.exports = smscloud;
