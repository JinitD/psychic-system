const amqp = require('amqplib/callback_api');

function public(chanal, message){
const rbUrl ='amqps://pbjcrrkp:ZgBwP_nYhVcPnFj3eisgDZQCsXHmSuNo@rat.rmq2.cloudamqp.com/pbjcrrkp';


    amqp.connect(rbUrl,(err,connection)=>{
        if(err){
            throw err;
        }
        connection.createChannel((err,channel)=>{
            if(err){
                throw err;
            }
            let queueName = "canal";
            channel.assertQueue(queueName,{
                durable: false
            });
            channel.sendToQueue(queueName,Buffer.from(JSON.stringify({chanal,message})));
            setTimeout(()=>{
                connection.close();
            },1000);
        })
    })
}

module.exports = {
    "public": public
}