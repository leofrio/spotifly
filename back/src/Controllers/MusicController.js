var {MongoClient,ObjectId}=require("mongodb") 
var url="mongodb+srv://leofrio:SpotiflyProject@spotiflycluster.gets69b.mongodb.net/?retryWrites=true&w=majority"

exports.list= async (req,res) => {
    const titulo  = req.query.title;
    if (titulo) { 
        await MongoClient.connect(url,function(err,con) { 
            if(err) throw err 
            var database=con.db("spotifly") 
            database.collection("musicas").find( { title: { $eq:titulo  } } ).toArray(function(err1,outcome) { 
                if(err1) throw err1 
                return res.json(outcome)
            })

        })        
    } else {
        await MongoClient.connect(url,function(err,con) { 
            if(err) throw err 
            var database=con.db("spotifly") 
            database.collection("musicas").find({}).toArray(function(err1,outcome) { 
                if(err1) throw err1 
                return res.json(outcome)
            })
        }) 
    }
        
}

// req get q busca musicas pelo id (busca pelo id)
exports.findById =async (req,res) => {  
    const id =req.params.id
    await MongoClient.connect(url,function(err,con) { 
        if(err){
            console.log("error connecting to database c") 
            throw err
        } 
        var database=con.db("spotifly")  
        database.collection("musicas").findOne({'_id' :ObjectId(id)},function(err1,outcome) {
            if(err1){ 
                console.log("error getting musicas by id")
                throw err1
            }  
        return res.json(outcome)
        }) 
    })
    
}

// adicion uma musica novo (cadastrar)
exports.post = async(req,res) => {    
    const newSong=req.body
    console.log(newSong)
    await MongoClient.connect(url,function(err,con) { 
        if(err) throw err 
        var database=con.db("spotifly")  
        database.collection("musicas").insertOne(newSong,(err1,outcome) => { 
            if(err1) {
                console.log("error in adding musicas")
            } 
            return res.json(outcome)
        }) 
    })
      
    
} 

// atualiza os valores das musicas req post (editar)
exports.put =async (req,res) => {  

    const id =req.params.id  
    await MongoClient.connect(url,function(err,con) { 
        if(err) throw err 
        var database=con.db("spotifly") 
        var newStuff=req.body
        database.collection("musicas").findOneAndUpdate({'_id':ObjectId(id)},{$set: {"artist": newStuff.artist,
        "title": newStuff.title,
        "song":newStuff.song }},
        {new:true},(err,doc) => { 
            if(err) { 
                console.log("something wrong with updating musicas!")
            } 
            return res.json(doc)
        })
    })
    
}