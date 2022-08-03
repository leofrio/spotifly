import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../SearchResults.css" 
import SearchBar from "../SearchBar";
import axios from "axios";
function SearchResults() { 
    const { results,playlistId } =useParams()
    const [loading,setLoading]=useState(false) 
    const [songs,setSongs]=useState([]) 
    const [playing,setPlaying]=useState(false);
    const [musicas, setMusicas] = useState({musicas:[]})
    var songsListed=["wow"]
    const [audio,setAudio]=useState(new Audio()) 
    const {playlist,setPlaylist} =useState({})

    useEffect( () => { 
        var  auxer=(playlistId !== undefined) ? playlistId : "" 
        axios.get(`http://localhost:5000/playlists/${auxer}`).then((res) => { 
            setPlaylist(res.data)
        }) 
    },[])
    useEffect( () => { 
        axios.get("http://localhost:5000/musicas").then((res) => { 
                setSongs(res.data.filter((value) => {
                    return value.title.toLowerCase().includes(results.toLowerCase())
                }))
                setMusicas(res.data)
            }) 
    },[])

    const PlaySong =  (song) => {         
        if(playing) { 
                setAudio(audio.pause())
                setPlaying(false);
        } 
        else {  
                setAudio(new Audio(`/music/${song}`))  
                if(!isNaN(audio.duration)) {
                    audio.pause()
                    audio.play()
                    setPlaying(true) 
                }
        }
    } 
    const addSong=(songId) => {  
        if(playlistId !== undefined) {
            var aux=playlist 
            console.log(aux)
            aux.musicas.push(musicas.find((o) => {return o._id ==songId}))  
            console.log(aux)
            axios.put(`http://localhost:5000/playlists/${playlistId}`,aux)
    } 
}
    

    songsListed=songs.map((o) =>   
        <div className="song-item">
        <li><button onClick={() => PlaySong(o.song)} className="button"><i
        className="fa fa-play"></i></button>{o.title}<button className="button" onClick={() => addSong(o._id)}><i className="fa fa-plus"></i></button></li>  
        
        </div>
    )   
    if(playlistId !== undefined) { 
        return ( 
            <>
             <div className="App">
                    <SearchBar placeholder="Pesquisar músicas, artistas, podcasts..." data={musicas} addsongs={true} playlistId={playlistId}/>
                </div>
            <div className="musicArea"> 
                <h1>resultados da pesquisa: {results}</h1>
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
    else { 
        return ( 
            <>
             <div className="App">
                    <SearchBar placeholder="Pesquisar músicas, artistas, podcasts..." data={musicas} addsongs={false} playlistId={undefined}/>
                </div>
            <div className="musicArea"> 
                <h1>resultados da pesquisa: {results}</h1>
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

} 
export default SearchResults