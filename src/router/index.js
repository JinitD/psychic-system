const express = require('express');
const router = express.Router();
const publisher = require('../../mq/publisher');
const crud = require('../public/js/crud')


router.get('/', async (req, res) => {
    res.render('home/home');
});

router.post('/publisher',  (req, res) => {
    const { chanal, message } = req.body;
    publisher.public(chanal, message);
    res.render('home/home');
})

///metodos crud
router.get('/consumer', async (req, res) => {
    const canales = await crud.getCollection();
    res.render('home/getData',{canales});
});

router.get('/delete-chanel/:id', async (req, res) => {
    crud.Delete(req.params.id);
    res.redirect('/consumer');
});

router.get('/edit-chanel/:id', async (req,res)=>{
    const canal = await crud.getData(req.params.id);
    console.log(canal)
    res.render('home/update',{canal})
})

router.post('/update-chanel/:id', async (req,res)=>{
    console.log(req.params)
    await crud.Update(req.params.id,req.body);
    res.redirect('/consumer');
})


module.exports = router;