# Spotifly

this is how to install this react project which i made with my friends at unifor in 2021, its stilla work in progress and you amy run into depreciated depencys, but heres the general formula

## front

- open terminal
- then type cd front
- then type npm i
- then type npm start
- if that doesnt work the openssl version might be wrong, so you have to paste this in the terminal
    - Linux or Mac: 
    ```
    export NODE_OPTIONS=--openssl-legacy-provider
    ``` 
    - Windows:
    ```
    set NODE_OPTIONS=--openssl-legacy-provider
    ```
## back

- open terminal
- type cd back
- type npm i
- type nodemon src/server.js
- if that doesnt work try npm i express nodemon
- and then to nodemon src/server.js
- if that still doesnt work try _npx nodemon src/server.js_

### additional information

- the front is supposed to run a tport 8000 whilist the back is made to run at port 5000, taht cannot be cahnged as it would make the project not work(i made this when i didnt know much about web developing)
- you have to have node.js installed for it to work
- the mongodb key here is mine and i need to reupdate it once in a while 
- if you are on linux  you might need to go to package.json and change '"start": "set PORT=8000 && react-scripts start"' to '"start": "PORT=8000 && react-scripts start"' if it doesnt run on port 8000
