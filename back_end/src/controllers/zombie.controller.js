const Joi = require('joi');
const { getZombiePosition } = require('../services/zombie.service');

async function zombieApocalypse(req, res) {
    const validatedData = await checkData(req.body);
    const zombiePosition = getZombiePosition(validatedData);
    return res.status(200).json(zombiePosition);
}

async function checkData(data) {
    const schema = Joi.object({
        gridSize: Joi.number().required().min(2).max(100),
        zombie: {
            x: Joi.number().required().min(0).max(data.gridSize - 1),
            y: Joi.number().required().min(0).max(data.gridSize - 1)
        },
        creatures: Joi.array().required().min(1).max(data.gridSize ** 2 - 1).items({
            x: Joi.number().required().min(0).max(data.gridSize - 1),
            y: Joi.number().required().min(0).max(data.gridSize - 1)
        }),
        commands: Joi.string().required().regex(/^[UDRLudrl]+$/)
    });

    const validatedData = await schema.validateAsync(data, { allowUnknown: true, stripUnknown: true });
    return validatedData;
}

module.exports = {
    zombieApocalypse
}