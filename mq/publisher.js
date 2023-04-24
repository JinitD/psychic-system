const amqp = require('amqplib/callback_api');

function public(chanal, message) {
    const rbUrl = process.env.RBURL;


    amqp.connect(rbUrl, (err, connection) => {
        if (err) {
            throw err;
        }
        connection.createChannel((err, channel) => {
            console.log("Publicar activo");
            if (err) {
                throw err;
            }
            let queueName = "canal";
            channel.assertQueue(queueName, {
                durable: false
            });
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ chanal, message })));
            setTimeout(() => {
                connection.close();
            }, 1000);
            console.log(queueName, Buffer.from(JSON.stringify({ chanal, message })))
        })
    })
}

module.exports = {
    "public": public
}