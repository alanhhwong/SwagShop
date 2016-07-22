'use strict';
var express = require('express');
var router = express.Router();

/*=====
 SETUP
======*/
var braintree = require('braintree');
var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   't9rvykyd9cpq2gy6',
    publicKey:    'xftzrcbdj7r7vb22',
    privateKey:   '9d4cc8d255956707f9d0d78c3e8b433c'
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

/*==============
FACEBOOK WEBHOOK
==============*/
router.post('/webhook', function (req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'swagshop_verify_token') {
        console.log('FB Webhook verification request received');
        res.status(200).send(req.query['hub.challenge']);
  }
});

module.exports = router;
