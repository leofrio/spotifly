import React , {useState, useEffect}from "react";
import { Link } from "react-router-dom";
//import Playlists from "../Data/PlaylistsData"; 
import '../playlists.css'
import axios from 'axios';
import Modal from '../Modal' 
import SearchBar from "../SearchBar";

export default function PlaylistPage(props) { 

  const isLogged=props.isLogged 
  const loggedId=props.loggedId
  const [id, setId] = useState({})
  const [name, setName] = useState({})
  const [descricao,setDescricao] = useState({})
  const [capa, setCapa] = useState({})
  const [autor, setAutor] = useState({})
  const [quantidadeFaixas, setQuantidadeFaixas] = useState({})
  const [quantidadeCurtidas, setquantidadeCurtidas] = useState({})
  const [musicas, setMusicas] = useState({musicas:[]})
  const [currentUser,setCurrentUser]=useState({playlists: []}) 
  var currentPlaylists=[{}]
  const [counter,setCounter]=useState(0)
  const [playlists,setPlaylists] = useState([]);
  const [loading,setLoading]=useState(false) 

  useEffect(() => { 
    setLoading(true)  
    var auxer= (loggedId == "-1") ? "" : loggedId
    axios.get(`http://localhost:5000/users/${auxer}`).then( (res) => {
            setCurrentUser(res.data)
            //console.log(currentUser.playlists)   
            axios.get("http://localhost:5000/musicas").then((res) => { 
              setMusicas(res.data)
            }) 
            
    }).finally(() => { 
      setLoading(false)
    })
  },[])  

  useEffect(() => {  
    setLoading(true)
    axios.get(`http://localhost:5000/playlists?userId=${loggedId}`).then(
      (res) => 
      {
        console.log("")
        setPlaylists(res.data)
      }).finally(() => { 
          setLoading(false)
      })

  },[])

  if(isLogged) {    
        if(loading) { 
          return(
            <>
            <p style={{color:"red"}}>Data is loading</p> 
            </>
          )
        } 
        else {  
          currentPlaylists = playlists.map((o) => { 
            return (
              <Link to = {`/playlistdetail/${o._id}`} >
                <img  src={`./images/${o.capa}`} ></img>
              </Link> 
            )
           }
          )  
          console.log(currentPlaylists)
            return( 
              <>   
              <div className="theWhole">
              <div className="App">
                <SearchBar placeholder="Pesquisar músicas, artistas, podcasts..." data={musicas} addsongs={false} playlistId={undefined}/>
            </div>
              <h1 style={{color:"black"}}>Bem vindo a suas playlists {currentUser.name}</h1>
              <div className="playMenu">
                  { currentPlaylists   }
                </div>
              <Modal loggedId={loggedId}/>  
              </div>
              </>
            )
        } 
  } else{  
          return (
            <> 
              <div className="App">
                      <SearchBar placeholder="Pesquisar músicas, artistas, podcasts..." data={musicas} addsongs={false} playlistId={undefined}/>
                  </div>
              <div className="playMenu">
                {playlists.map((o) => (
        
        <Link to = {`/playlistdetail/${o._id}`} >
            <img  src={`./images/${o.capa}`} ></img>
        </Link>)
                )}
      
              </div>
            </>
      ); 
}

}


