const { Router } = require('express');
const { listTypesDietsDefault } = require('../controllers/listTypesDiets')
const { Diet } = require('../db')

const router = Router();

router.get('/', async (req, res) => {
    //res.send('Estoy en GET de dietas');
    try {
        listTypesDietsDefault.forEach(e => {
            Diet.findOrCreate({
                where: { name: e }
            })
        });
        const dietTypes = await Diet.findAll();
        res.send(dietTypes)
    } catch (error) {
        res.status(400).send(error);
    }

});


module.exports = router;