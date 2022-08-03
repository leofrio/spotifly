import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../SearchResults.css"
import "../AddSong.css"
import SearchBar from "../SearchBar";
import axios from "axios";

function AddSongs(props) {
    const { results } =useParams()
    const [loading,setLoading]=useState(false) 
    const [songs,setSongs]=useState([]) 
    const [playing,setPlaying]=useState(false);
    const [musicas, setMusicas] = useState([]) 
    const { id }=useParams()
    var songsListed=["wow"]
    const [audio,setAudio]=useState(new Audio()) 
    const [Playlist,setPlaylist]=useState({musicas:[]})
    useEffect(() => { 
        axios.get(`http://localhost:5000/playlists/${id}`).then((res) => { 
            console.log(res.data)
            setPlaylist(res.data)
        }) 
        axios.get("http://localhost:5000/musicas").then((res) => {
        setMusicas(res.data) 
    })
    },[])
    const PlaySong = (song) => {
        if (playing) {
            setAudio(audio.pause())
            setPlaying(false);
        }
        else {
            setAudio(new Audio(`/music/${song}`))
            if (!isNaN(audio.duration)) {
                audio.pause()
                audio.play()
                setPlaying(true)
            }
        }
    }
    const addSong=(songId) => {  
        var aux=Playlist 
        console.log(aux)
        aux.musicas.push(musicas.find((o) => {return o._id ==songId}))  
        console.log(aux)
        axios.put(`http://localhost:5000/playlists/${id}`,aux).then((res) => { 
            //setPlaylist(res.data)
        })
    }
    songsListed = musicas.map((o,i) =>
        <div className="song-item">
            <li><button onClick={() => PlaySong(o.song)} className="button"><i
                className="fa fa-play"></i></button>{o.title}<button onClick={() => addSong(o._id)} className="button"  ><i className="fa fa-plus"></i></button></li>

        </div>
    )

    return (
        <>
            <div className="App">
                <SearchBar placeholder="Pesquisar músicas, artistas, podcasts..." data={musicas} addsongs={true} playlistId={id} /> 
            </div>
            <div className="musicArea">
                <h1>Adicione musicas a sua playlist </h1>
                <table>
                    <tr>
                        <th><h6>#</h6></th>
                        <th><h6>Título</h6></th>
                        <th><h6>Artista</h6></th>
                        <th><h6>Album</h6></th>
                        <th><h6>Adicionado em</h6></th>
                    </tr>
                    <tr>
                        <td >{songsListed}</td>


                    </tr>
                </table>
            </div>
        </>
    )
}

export default AddSongs