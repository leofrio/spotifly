const express = require('express');
const server=express()  
const userRout=require("./Routers/UserRoute")
const playlistRout=require("./Routers/PlaylistRouter")
const musicRout=require("./Routers/MusicRouter");  
var cors=require("cors") 
server.use(cors({ origin: true, credentials: true }));
server.use(express.json())
server.use("/users",userRout)
server.use("/playlists",playlistRout)
server.use("/musicas",musicRout)
          

server.listen(5000,() => {  
    console.log("database running")
})  