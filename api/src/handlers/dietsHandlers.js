const { Diet } = require('../db')
const { listTypesDietsDefault } = require('../controllers/listTypesDiets')

const getDietsHandlers = async (req, res) => {
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

};

module.exports = {getDietsHandlers};