var {MongoClient,ObjectId}=require("mongodb") 
var url="mongodb+srv://leofrio:SpotiflyProject@spotiflycluster.gets69b.mongodb.net/?retryWrites=true&w=majority"

exports.list=async (req,res) => {
    const nome  = req.query.name;
    if (nome) { 
        await MongoClient.connect(url,function(err,con) { 
            if(err) throw err 
            var database=con.db("spotifly") 
            database.collection("users").find( { name: { $eq:nome  } } ).toArray(function(err1,outcome) { 
                if(err1) throw err1 
                return res.json(outcome)
            })

        })        
    }else {
        await MongoClient.connect(url,function(err,con) { 
            if(err) throw err 
            var database=con.db("spotifly") 
            database.collection("users").find({}).toArray(function(err1,outcome) { 
                if(err1) throw err1 
                return res.json(outcome)
            })
        }) 
    }
       
}

// req get q busca users pelo id (busca pelo id)
exports.findById =async (req,res) => {  
    const id =req.params.id
    await MongoClient.connect(url,function(err,con) { 
        if(err){
            console.log("error connecting to database b") 
            throw err
        } 
        var database=con.db("spotifly")  
        database.collection("users").findOne({'_id' :ObjectId(id)},function(err1,outcome) {
            if(err1){ 
                console.log("errorgettinguserbyid")
                throw err1
            }  
        return res.json(outcome)
        }) 
    })
}

// adicion aum usuario novo (cadastrar)
exports.post = async (req,res) => {    
    const newPlaylist=req.body
    console.log(newPlaylist)
    await MongoClient.connect(url,function(err,con) { 
        if(err) throw err 
        var database=con.db("spotifly")  
        database.collection("users").insertOne(newPlaylist,(err1,outcome) => { 
            if(err1) {
                console.log("error in adding users")
            } 
            return res.json(outcome)
        }) 
    })
      
} 

// atualiza os valores dos user req post (editar)
exports.put =async (req,res) => {  

    const id =req.params.id  
    await MongoClient.connect(url,function(err,con) { 
        if(err) throw err 
        var database=con.db("spotifly") 
        var newStuff=req.body
        database.collection("users").findOneAndUpdate({'_id':ObjectId(id)},{$set: {"name": newStuff.name,"email":newStuff.email,"senha":newStuff.senha,"dataNascimento":newStuff.dataNascimento,"playlists":newStuff.playlists}},
        {new:true},(err,doc) => { 
            if(err) { 
                console.log("something wrong with updating users!")
            } 
            return res.json(doc)
        })
    })
    
}