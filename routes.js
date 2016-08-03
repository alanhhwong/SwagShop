'use strict';
var express = require('express');
var router = express.Router();
var config = require('./config').braintree;

/*=====
 SETUP
======*/
var braintree = require('braintree');
var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   config.MERCHANT_ID,
    publicKey:    config.PUBLIC_KEY,
    privateKey:   config.PRIVATE_KEY
});

router.get('/', function (req, res) {
    res.redirect('index.html');
});

/*==========
 GET TOKEN
===========*/
router.get('/get_token', function (req,res) {
    gateway.clientToken.generate({}, function(err, response) {
        res.send(response);
    });
});

/*===============
 PROCESS PAYMENT
================*/
router.post('/pay', function (req, res) {
    var nonce = req.body.payment_method_nonce;
console.log(nonce);
    gateway.transaction.sale({
        amount: '3.50',
        paymentMethodNonce: nonce
    }, function (err, result) {
        if (result.success) {
            console.log(result);
            res.redirect('success.html');
        }
    });
});

module.exports = router;
