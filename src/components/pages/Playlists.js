import React , {useState, useEffect}from "react";
import { Link } from "react-router-dom";
//import Playlists from "../Data/PlaylistsData"; 
import '../playlists.css'
import axios from 'axios';


export default function PlaylistPage(props) { 

  const isLogged=props.isLogged 

  const [id, setId] = useState({})
  const [name, setName] = useState({})
  const [descricao,setDescricao] = useState({})
  const [capa, setCapa] = useState({})
  const [autor, setAutor] = useState({})
  const [quantidadeFaixas, setQuantidadeFaixas] = useState({})
  const [quantidadeCurtidas, setquantidadeCurtidas] = useState({})
  const [musicas, setMusicas] = useState({})
  const [currentUser,setCurrentUser]=useState({}) 


  const [playlists,setPlaylists] = useState([]);

  useEffect( () => {
    axios.get("http://localhost:5000/playlistsDefault").then((res) => setPlaylists(res.data))
  }, [])



  if(isLogged) {   
    axios.get("http://localhost:5000/currentUser").then( (res) => {
            setCurrentUser(res.data)
        }
    )

    axios.get("http://localhost:5000/playlistUser")
  

    return( 
      <>
      <h1 style={{color:"black"}}>Bem vindo a suas playlists {currentUser.name}</h1>
      </>
    )
  } else{

  return (
      <> 
        <div className="sb">
        </div>
        <div className="playMenu">
          {playlists.map((o) => (
   
   <Link to = {`/playlistdetail/${o.id}`} >
      <img  src={`./images/${o.capa}`} ></img>
  </Link>)
          )}

        </div>
      </>
  );       
}

}


