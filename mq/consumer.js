const amqp = require('amqplib/callback_api');
const express = require('express');
const router = express.Router();
const crud = require('../src/public/js/crud')

const rbUrl = 'amqps://pbjcrrkp:ZgBwP_nYhVcPnFj3eisgDZQCsXHmSuNo@rat.rmq2.cloudamqp.com/pbjcrrkp';

amqp.connect(rbUrl, (err, connection) => {
    if (err) {
        throw err;
    }

    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        console.log("Consumidor activado");
        let queueName = "canal";
        channel.assertQueue(queueName, {
            durable: false
        });

        channel.consume(queueName, (msg) => {
            const data = JSON.parse(msg.content.toString());
            console.log('recive: ' +data)
            crud.setData(data);
            channel.ack(msg);
        });

    });
})



module.exports = router;
