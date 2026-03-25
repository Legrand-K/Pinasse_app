const axios = require('axios');
const Cinetpay = require('../../../classes/default/cinetpay.class');
const Common = require('../common')

class TransactionInfo {
    apikey;
    site_id;
    transaction_id;
    notify_url;
    return_url;

    amount;
    currency;
    description;
    channels;

    alternative_currency;
    customer_id;
    customer_name;
    customer_surname;
    customer_email;
    customer_phone_number;
    customer_address;
    customer_city;
    customer_country;
    customer_state;
    customer_zip_code;
    lang;
    lock_phone_number;

    constructor(Obj) {
        Object.assign(this, Obj);
        if(!this.notify_url) this.notify_url = 'http://localhost:3001/api/service/cinetpay/payment/notification';
        if(!this.return_url) this.return_url = 'http://localhost:3001/api/service/cinetpay/payment/notification';
        if(!this.lang) this.lang = 'FR';
        if(!this.channels) this.channels = 'ALL';
        if(!this.currency) this.currency = 'XOF';
    }
    setCredentials(siteID, apiKey) {
        this.site_id = siteID;
        this.apikey = apiKey;
    }
    control() {
        if (this.customer_phone_number) this.lock_phone_number = true;
        if (!this.transaction_id) throw({response :{error: true, message : 'Champ *transaction_id* obligatoire'}});
        if (!this.site_id) throw({response :{error: true, message : 'Champ *site_id* obligatoire'}});
        if (!this.apikey) throw({response :{error: true, message : 'Champ *apikey* obligatoire'}});
        if (!this.amount) throw({response :{error: true, message : 'Champ *amount* obligatoire'}});
        if (!this.description) throw({response :{error: true, message : 'Champ description obligatoire'}});
        if ((this.amount % 5) != 0) throw({response :{error: true, message : 'Le montant doit être un mutiple de 5'}});
    }
    clean(obj = this) {
        let response = {};
        try {
            if (Array.isArray(obj)) {
                response = obj.map((e) => {
                    return this.clean(e)
                });
            } else {
                let dataValues = obj;
                for (var propName in dataValues) {
                    if (dataValues[propName] === null || dataValues[propName] === undefined) {
                        delete dataValues[propName];
                    }
                }
                obj = dataValues;
                response = obj;
            }
        } catch (error) {
            response = obj;
        }
        return response;
    }
}

class Payment extends Common {
    constructor() {
        super();
    }
    async checkPaymentStatus(body) {
        let response = {};
        if ( 'cpm_trans_id' in body) {
            let payCheckData = {
                apikey : this.APIKEY,
                site_id : this.SITEID,
                transaction_id : body.cpm_trans_id
            }
          
            try {
                const r = await axios.post(this.URI_PAYMENT_CHECK, payCheckData);
                response = r.data;
                if (response.data.status=='ACCEPTED'){
                    /*Mettre à jour la base de donnée !*/
                    //response.data.operator_id
                    let CIN_CODE = body.cpm_trans_id;
                    let CIN_TRANS_ID = response.data.operator_id;
                    let cinetPay = new Cinetpay();
                
                    let cresponse = await cinetPay.activate(CIN_CODE, CIN_TRANS_ID);
                }
                return response;
            } catch (error) {
                console.log(error)
                response = error.response;
            }
        }
        return response;
    }
    async getPaymentLink(obj) {
        let response = {};
        let transactionData =  new TransactionInfo(obj);
        transactionData.setCredentials(this.SITEID,this.APIKEY);
        transactionData.clean();
        try {
            transactionData.control();
            const r = await axios.post(this.URI_PAYMENT, transactionData);
            response = r.data;
            return response;
        } catch (error) {
            response = error.response;
        }
        return response;
    }
}
/*let fn = async () => {
    const response = await new Payment().getPaymentLink({
        transaction_id: "b8058169e0ee64568adea909f7b7d2",
        amount: 100,
        description: "Paiement Facture"
    });
    console.log(response.data);
};
fn();*/
module.exports = Payment;
