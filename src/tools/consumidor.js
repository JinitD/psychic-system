const amqp = require('amqplib');
const dbpool = require('../src/database');

Consumidors()
    .catch(err => {
        console.error(err)
        process.exit(1)
    })



var array = []
var jsonData = {}
var numero = 0;
var n = 0;

async function Consumidors() {
    //Crear conecxion
    const conection = await amqp.connect('amqps://pbjcrrkp:ZgBwP_nYhVcPnFj3eisgDZQCsXHmSuNo@rat.rmq2.cloudamqp.com/pbjcrrkp');
    //crear canales
    const chanel = await conection.createChannel();

    while (n < 4) {
        n = n + 1;
        const queue = queuePro(n)

        const msg  =chanel.consume(queue);
        await chanel.consume(queue, message => {
            const contenido = JSON.parse(message.content.toString());
            array.push(contenido)
            chanel.ack(message)
            numero = numero + 1;
            if (numero == 4) {
                jsonArray()
            }

        });
    }

}

function jsonArray() {
    jsonData.name_app = array[0];
    jsonData.fecha = array[1];
    jsonData.fk_ip = array[2];
    jsonData.time_aplicacion = array[3];
    console.log(jsonData)
    //          insert();
    array = [];
    numero = 0;

}

async function insert() {
    try {
        await dbpool.query('insert into control_app set ?', [jsonData], (err, filas) => {
            if (err) {
                throw err;
            } else {
                console.log('fila inserteada')
            }
        });
    } catch (error) {

    }

}


function queuePro(n) {
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






channel.consume(queueName, (msg) => {
    mensaje = msg.content.toString();
    const OldDock = { queueName, mensaje };
    console.log('recive: ' + OldDock.queueName + ": " + OldDock.mensaje)
    channel.ack(msg);
    return OldDock;
});
