function getZombiePosition(validatedData) {
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
                move(obj, gridSize);
                log += `\n zombie ${obj.zombieIndex} moved to (${obj.x},${obj.y});`;
            }
        });

        //check infection, give role & action to new zombie
        objArr.forEach(obj => {
            if (obj.role === 'zombie') {
                let infectionIndex = objArr.findIndex((ele) => ele.role === 'creature' && ele.x === obj.x && ele.y === obj.y);
                if (infectionIndex > -1) {
                    currentZombieIndex = infectCreature(objArr, commands, infectionIndex, currentZombieIndex);
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
        outputObj[obj.role + 's'].push({ x: obj.x, y: obj.y });
    });

    return { gridSize, outputObj, log };
}

function move(obj, gridSize) {
    switch (obj.action[0]) {
        case 'U': obj.y = --obj.y < 0 ? gridSize - 1 : obj.y--; break;
        case 'D': obj.y = ++obj.y > gridSize - 1 ? 0 : obj.y++; break;
        case 'L': obj.x = --obj.x < 0 ? gridSize - 1 : obj.x--; break;
        case 'R': obj.x = ++obj.x > gridSize - 1 ? 0 : obj.x++; break;
        default: obj;
    }
    obj.action.shift();
}

function infectCreature(objArr, commands, infectionIndex, currentZombieIndex) {
    
    objArr[infectionIndex].role = 'zombie';
    objArr[infectionIndex].action = commands.toUpperCase().split('');
    objArr[infectionIndex].zombieIndex = ++currentZombieIndex;
    return currentZombieIndex;
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
    getZombiePosition
}