const { db } = require('../../firebase');

const collec = "canales"

async function getCollection() {
    const collectio = await db.collection(collec).get();
    const data = collectio.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    return data;
}

async function setData(data) {
    await db.collection(collec).add({
        data,
    })
}


async function Delete(id) {
    await db.collection(collec).doc(id).delete();

}

async function getData(id) {
    const data = await db.collection(collec).doc(id).get();
    req = { id: data.id, ...data.data() };
    return req;
}

async function Update(id,body) {
    
    await db.collection(collec).doc(id).update({'data':body})

}

module.exports = {
    'getCollection': getCollection,
    'setData': setData,
    'Delete': Delete,
    'Update': Update,
    'getData': getData
}