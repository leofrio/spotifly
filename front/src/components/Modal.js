import React, { useState , useEffect} from "react";
import "./Modal.css";
import axios, { Axios } from 'axios';
import {useNavigate} from 'react-router-dom'

export default function  Modal(props) {

  const [modal, setModal] = useState(false);
  const [listName, setListName] = useState("")
  const [autor, setAutor] = useState("")
  const [playlistsUser,setPlaylistsUser] = useState({});
  const [currentUser,setCurrentUser]=useState({})
  const loggedId=props.loggedId  
  const [loading,setLoading]=useState(false) 


  const toggleModal = () => {
    setModal(!modal);
  }; 
  useEffect( () => { 
    setLoading(true);
    var auxer= (loggedId == "-1") ? "" : loggedId
    axios.get(`http://localhost:5000/users/${auxer}`).then( (res) => { 
      setCurrentUser(res.data)
    } 
    ).finally(() => { 
      setLoading(false)
    })
  },[])

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    var newPlaylist = {name:listName,capa:"blankPlaylist.png",descricao: "a",autor: `${currentUser.name}`,quantidadeFaixas: "2 faixas",quantidadeCurtidas: "2.450 curtidas",userId:currentUser._id,musicas:[]}
    console.log("this is the current user")
    console.log(currentUser)
    axios.post(`http://localhost:5000/playlists`,newPlaylist).then((res) => { 
      var aux=currentUser   
      console.log("this is the")
      console.log(aux)
      newPlaylist=res.data
      aux.playlists.push(newPlaylist) 
      axios.put(`http://localhost:5000/users/${currentUser._id}`,aux)

    }).finally(() => { 
      toggleModal(); 
    })
}

if(loading) { 
  return(
    <>
    <p style={{color:"red"}}>Data is loading</p> 
    </>
  )
} else{
  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Criar playlist
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div> 
          <div className="modal-content">
            <h2>De um nome para sua playlist</h2>

            <input type="text" onChange={(e) => setListName(e.target.value)} id="listName" placeholder="Digite o nome da sua playlist" ></input>

            <button type ="submit" className="save-modal" onClick={handleSubmit.bind(this)}>
              Salvar
            </button>
            <button className="close-modal" onClick={toggleModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    
    </>
  );
      }
}