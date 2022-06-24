const amqp = require('amqplib');
var messageCantidad = 5

const wait = 1500


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
async function exitDespuesEnviar() {
    await sleep(messageCantidad * wait * 1.2)
    process.exit(0);
}

async function Pulbicador() {
    //Crear conexión
    //nueva: amqps://pbjcrrkp:ZgBwP_nYhVcPnFj3eisgDZQCsXHmSuNo@rat.rmq2.cloudamqp.com/pbjcrrkp
    // vieja amqps://qzobxabx:6-BmT6b-y8OEoPoa3or082fY-8oAhfJ9@toad.rmq.cloudamqp.com/qzobxabx
    const conection = await amqp.connect('amqps://pbjcrrkp:ZgBwP_nYhVcPnFj3eisgDZQCsXHmSuNo@rat.rmq2.cloudamqp.com/pbjcrrkp');
    //crear canales
    const chanel = await conection.createChannel();
    while (messageCantidad > 0) {
        var n = 0;
        messageCantidad = messageCantidad - 1;
        while (n < 4) {
            n = n + 1;
            const queue = await queuePro(n);
            const message = await Control(n);
            await chanel.assertQueue(queue);
            //crear mensaje y se envia lupeados
            const sent = await chanel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
            sent ?
                console.log('Se envio al canal', queue, ' queue el siguiente mensaje:', message) : console.log('fails')
        }
    }

}

async function queuePro(n) {
    var queue = '';
    switch (n) {
        case 1:
            queue = 'name_app';
            break;
        case 2:
            queue = 'fecha';
            break;
        case 3:
            queue = 'fk_ip';
            break;
        case 4:
            queue = 'time_aplication';
            break;

        default:
            break;
    }
    return queue;
}

async function Control(n) {
    if (n == 1) {
        return await appMessa();
    }
    if (n == 2) {
        return await dataTimeMessa();
    }
    if (n == 3) {
        return '123.456.7.2'
    }
    if (n == 4) {
        return await timeMessa();
    }

}

async function dataTimeMessa() {
    const fecha = new Date();
    const añoActual = fecha.getFullYear();
    const hoy = fecha.getDay();
    const mesActual = fecha.getMonth() + 1;
    const message = añoActual + '-' + mesActual + '-' + hoy
    return await message
}

async function timeMessa() {
    const message = '' + Math.floor(0.5 * Math.random() * 10) + ':' + 4 * Math.floor(Math.random() * 10) + ':' + 4 * Math.floor(Math.random() * 10)
    return await message
}

async function appMessa() {

    const op = +Math.floor(0.7 * Math.random() * 10)
    var message = ''
    switch (op) {
        case 0:
            message = 'Chrome'
            break;
        case 1:
            message = 'WhatsApp'
            break;
        case 2:
            message = 'Facebook'

            break;
        case 3:
            message = 'Instagram'

            break;
        case 4:
            message = 'Call of Duty'

            break;
        case 5:
            message = 'Telegram'
            break;
        case 6:
            message = 'Gmail'
            break;
        default:
            message = 'Pes 2021'

            break;
    }
    return await message;
}


Pulbicador()
    .catch(err => {
        console.error(err)
        process.exit(1)
    })
exitDespuesEnviar();