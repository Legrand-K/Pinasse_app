module.exports = (app) => {
    const router = require("express").Router();
    const Payment = require('..');

    router.post("/", async function (req, res) {
        let response  = await new Payment().checkPaymentStatus(req.body);
        res.send(response.data);
    });
    app.use(`/api/service/cinetpay_service/payment/notification`, router);
};