const Joi = require('joi');

async function zombieApocalypse(req, res) {
    const validatedData = await checkData(req.body);
    const { gridSize, zombie, creatures, commands } = validatedData;
    const commandsArr = commands.toUpperCase().split('');

    //restructure data to a new object array
    const objArr = [];
    objArr.push(new Substance('zombie', zombie.x, zombie.y, commandsArr, 0));
    creatures.forEach(creature => {
        objArr.push(new Substance('creature', creature.x, creature.y, [], creatures.length + 2));
    });

    //main 
    let log = `Zombie Apocalypse in ${new Date()}.`;
    let currentZombieIndex = 0;
    let stepQty = commandsArr.length;
    let totalStepQty = 0;

    while (stepQty > 0) {
        totalStepQty++;
        log += `\n ----- step ${totalStepQty} -----`;
        stepQty--;

        //move 1 step
        objArr.forEach(obj => {
            if (obj.action.length > 0) {
                let position = { x: obj.x, y: obj.y };
                switch (obj.action[0]) {
                    case 'U': position = goUp(obj.x, obj.y, gridSize); break;
                    case 'D': position = goDown(obj.x, obj.y, gridSize); break;
                    case 'L': position = goLeft(obj.x, obj.y, gridSize); break;
                    case 'R': position = goRight(obj.x, obj.y, gridSize); break;
                    default: position;
                }
                obj.x = position.x;
                obj.y = position.y;
                obj.action.shift();
                log += `\n zombie ${obj.zombieIndex} moved to (${obj.x},${obj.y});`;
            }
        });

        //check infection, give role & action to new zombie
        objArr.forEach(obj => {
            if (obj.role === 'zombie') {
                let infectionIndex = objArr.findIndex((ele) => ele.role === 'creature' && ele.x === obj.x && ele.y === obj.y);
                if (infectionIndex > -1) {
                    objArr[infectionIndex].role = 'zombie';
                    objArr[infectionIndex].action = commands.toUpperCase().split('');
                    objArr[infectionIndex].zombieIndex = ++currentZombieIndex;
                    stepQty = commands.length;
                    log += `\n zombie ${obj.zombieIndex} infected creature at (${obj.x},${obj.y});`;
                }
            }
        });

        //sorting
        objArr.sort(compare('zombieIndex'));
    }

    //restructure objArr to output
    const outputObj = { zombies: [], creatures: [] };
    objArr.forEach(obj => {
        outputObj[obj.role + 's'].push({ x: obj.x, y: obj.y })
    });

    return res.status(200).json({ gridSize, objArr, outputObj, log });
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

function goUp(x, y, gridSize) {
    return { x, y: --y < 0 ? gridSize - 1 : y-- }
}

function goDown(x, y, gridSize) {
    return { x, y: ++y > gridSize - 1 ? 0 : y++ }
}

function goLeft(x, y, gridSize) {
    return { x: --x < 0 ? gridSize - 1 : x--, y }
}

function goRight(x, y, gridSize) {
    return { x: ++x > gridSize - 1 ? 0 : x++, y }
}

class Substance {
    constructor(role, x, y, action, zombieIndex) {
        this.role = role;
        this.x = x;
        this.y = y;
        this.action = action;
        this.zombieIndex = zombieIndex;
    }
}

function compare(p) {
    return function (m, n) {
        return m[p] - n[p];
    }
}


module.exports = {
    zombieApocalypse
}