import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"; 
import Playlists from "../Data/PlaylistsData"; 
import '../playlistdetail.css' 
function Playlistdetail() {  
    
    var playing=false;
    const { id }=useParams()  
    const [first,setFirst]=useState(true)
    const playlistObj=Playlists[id-1]
    const songPlay=playlistObj.musicas.map((o) => <li><button onClick={() => PlaySong(o.song)} className="button"><i
        className="fa fa-play"></i></button></li>)
    const songTitles=playlistObj.musicas.map((o) => <li><h5>{o.title}</h5></li>)
    const songArtist=playlistObj.musicas.map((o) => <li><h5>{o.artist}</h5></li>)
    const songAlbum=playlistObj.musicas.map((o) => <li><h5>{o.album}</h5></li>)
    const dataAdicao=playlistObj.musicas.map((o) => <li><h5>{o.dataAdicao}</h5></li>)

    let audio;
    const PlaySong = async (song) => {         
           if(playing) { 
                audio.pause()
                playing=false;
           } 
           else { 
                audio=new Audio(`/music/${song}`) 
                await audio.play()
                playing=true
           }
    }
    return(
        <>

        <div className="sideArea">
            <img src={`/images/${playlistObj.capa}`} alt="cannot display"></img>
            <div className="coluna">
                <h1>{playlistObj.name}</h1>
                <h4>{playlistObj.descricao}</h4>
                <div className="linha">
                    <h4>{playlistObj.autor}</h4>
                    <h4>{playlistObj.quantidadeFaixas}</h4>
                    <h4><i className="fa fa-heart"></i> {playlistObj.quantidadeCurtidas}</h4>
                </div>
            </div>

        </div>
        <div className="musicArea">
            <table>
                 <tr>
                    <th><h6>#</h6></th>
                    <th><h6>Título</h6></th>
                     <th><h6>Artista</h6></th>
                     <th><h6>Album</h6></th>
                     <th><h6>Adicionado em</h6></th>
                </tr>
                <tr>
                    <td width="10%">{songPlay}</td>
                    <td width="40%">{songTitles}</td>
                    <td>{songArtist}</td>
                    <td>{songAlbum}</td>
                    <td width="13%">{dataAdicao}</td>

                </tr>
            </table>
        </div>
        </>
    )


}  
export default Playlistdetail