const axios = require('axios');

class Common {
    URI_PAYMENT = 'https://api-checkout.cinetpay.com/v2/payment';
    URI_PAYMENT_CHECK = 'https://api-checkout.cinetpay.com/v2/payment/check';
    APIKEY = '733338058607dfc1d86dc47.05485406';
    SITEID = '626426';
    constructor() { }
}
module.exports = Common;