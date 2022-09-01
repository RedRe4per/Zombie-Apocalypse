### Zombie Apocalypse

#### Name and description

This is a simulation game called 'Zombie Apocalypse'. You can set up an N*N grid, set a zombie and several creatures on it, and plan an action route for the zombies. Zombie will move according to the action route and infect all the creatures on the way, and the infected creatures will become zombie and move as well.



#### Install dependencies 

```powershell
$ npm i
```



#### Start this App

**Environment Variables**

Add a `.env` file at back_end directory, and then add following code in this file:

```
NODE_ENV === 'production'
PORT=8000
```

**Start back-end server**

```powershell
cd back_end
nodemon src/index.js
```

**Start front-end**

```powershell
cd front_end
npm start
```



#### Usage

First, please set the grid size, the starting position of zombies and creature. If you need more creatures, click 'more creature' and set the position of the extra creature. When you click 'submit', you will see the simulated result.