const { getZombiePosition } = require('../services/zombie.service');

test('zombie and creatures to new state and position', () => {
    const date = new Date();
    expect(getZombiePosition({
        "gridSize": 4,
        "zombie": {
            "x": 3,
            "y": 1
        },
        "creatures": [
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 3
            }
        ],
        "commands": "DURDrrllll"
    })).toStrictEqual({
        "gridSize": 4,
        "outputObj": {
            "zombies": [
                {
                    "x": 2,
                    "y": 2
                },
                {
                    "x": 3,
                    "y": 2
                },
                {
                    "x": 0,
                    "y": 3
                },
                {
                    "x": 2,
                    "y": 0
                }
            ],
            "creatures": []
        },
        "log": `Zombie Apocalypse in ${date}.\n ----- step 1 -----\n zombie 0 moved to (3,2);\n ----- step 2 -----\n zombie 0 moved to (3,1);\n ----- step 3 -----\n zombie 0 moved to (0,1);\n zombie 0 infected creature at (0,1);\n ----- step 4 -----\n zombie 0 moved to (0,2);\n zombie 1 moved to (0,2);\n ----- step 5 -----\n zombie 0 moved to (1,2);\n zombie 1 moved to (0,1);\n zombie 0 infected creature at (1,2);\n ----- step 6 -----\n zombie 0 moved to (2,2);\n zombie 1 moved to (1,1);\n zombie 2 moved to (1,3);\n ----- step 7 -----\n zombie 0 moved to (1,2);\n zombie 1 moved to (1,2);\n zombie 2 moved to (1,2);\n ----- step 8 -----\n zombie 0 moved to (0,2);\n zombie 1 moved to (2,2);\n zombie 2 moved to (2,2);\n ----- step 9 -----\n zombie 0 moved to (3,2);\n zombie 1 moved to (3,2);\n zombie 2 moved to (2,3);\n ----- step 10 -----\n zombie 0 moved to (2,2);\n zombie 1 moved to (2,2);\n zombie 2 moved to (3,3);\n zombie 2 infected creature at (3,3);\n ----- step 11 -----\n zombie 1 moved to (1,2);\n zombie 2 moved to (0,3);\n zombie 3 moved to (3,0);\n ----- step 12 -----\n zombie 1 moved to (0,2);\n zombie 2 moved to (3,3);\n zombie 3 moved to (3,3);\n ----- step 13 -----\n zombie 1 moved to (3,2);\n zombie 2 moved to (2,3);\n zombie 3 moved to (0,3);\n ----- step 14 -----\n zombie 2 moved to (1,3);\n zombie 3 moved to (0,0);\n ----- step 15 -----\n zombie 2 moved to (0,3);\n zombie 3 moved to (1,0);\n ----- step 16 -----\n zombie 3 moved to (2,0);\n ----- step 17 -----\n zombie 3 moved to (1,0);\n ----- step 18 -----\n zombie 3 moved to (0,0);\n ----- step 19 -----\n zombie 3 moved to (3,0);\n ----- step 20 -----\n zombie 3 moved to (2,0);`
    });
});

