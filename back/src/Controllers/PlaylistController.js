var {MongoClient,ObjectId}=require("mongodb") 
var url="mongodb+srv://leofrio:SpotiflyProject@spotiflycluster.gets69b.mongodb.net/?retryWrites=true&w=majority"

exports.list=async (req,res) => {
    const nome  = req.query.name;
    const idOfPlaylist=req.query.userId
    if (nome) { 
       await  MongoClient.connect(url,function(err,con) { 
            if(err) throw err 
            var database=con.db("spotifly") 
            database.collection("playlists").find( { name: { $eq:nome  } } ).toArray(function(err1,outcome) { 
                if(err1) throw err1 
                return res.json(outcome)
            })

        })        
    }else if (idOfPlaylist) {  
        await MongoClient.connect(url,function(err,con) { 
            if(err){
                console.log("error connecting to database") 
                throw err
            } 
            var database=con.db("spotifly") 
            database.collection("playlists").find( { userId: idOfPlaylist } ).toArray(function(err1,outcome) { 
                if(err1) {
                    console.log('error leo')
                    throw err1
                }  
                return res.json(outcome)
            })

        })
    } else {
        await MongoClient.connect(url,function(err,con) { 
            if(err) throw err 
            var database=con.db("spotifly") 
            database.collection("playlists").find({}).toArray(function(err1,outcome) { 
                if(err1) throw err1 
                return res.json(outcome)
            })
        }) 
    }
        
}

// req get q busca playlists pelo id (busca pelo id)
exports.findById =async (req,res) => {  
    const id =req.params.id
    await MongoClient.connect(url,function(err,con) { 
        if(err){
            console.log("error connecting to database a") 
            throw err
        } 
        var database=con.db("spotifly")  
        database.collection("playlists").findOne({'_id' :ObjectId(id)},function(err1,outcome) {
            if(err1){ 
                console.log("error getting playlist by id")
                throw err1
            }  
        return res.json(outcome)
        }) 
    })
    
}

// adicion uma playlist nova (criar playlists)
exports.post = async (req,res) => {    
    const newPlaylist=req.body
    console.log(newPlaylist)
    await MongoClient.connect(url,function(err,con) { 
        if(err) throw err 
        var database=con.db("spotifly")  
        database.collection("playlists").insertOne(newPlaylist,(err1,outcome) => { 
            if(err1) {
                console.log("error in adding playlists aaaa")
            } 
            return res.json(outcome)
        }) 
    })
      
} 

// atualiza os valores dos playlist do put (editar)
exports.put = async(req,res) => {  

    const id =req.params.id  
    await MongoClient.connect(url,function(err,con) { 
        if(err) throw err 
        var database=con.db("spotifly") 
        var newStuff=req.body
        database.collection("playlists").findOneAndUpdate({'_id':ObjectId(id)},{$set: {"name":newStuff.name ,"descricao":newStuff.descricao,"autor":newStuff.autor ,"quantidadeFaixas":newStuff.quantidadeFaixas ,"quantidadeCurtidas":newStuff.quantidadeCurtidas ,"capa":newStuff.capa ,"userId":newStuff.userId ,"musicas":newStuff.musicas  }},
        {new:true},(err,doc) => { 
            if(err) { 
                console.log("something wrong with updating playlists!")
            } 
            return res.json(doc)
        })
    })
    
}