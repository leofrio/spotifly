import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../playlistdetail.css";
function Playlistdetail(props) {
  const [loading, setLoading] = useState(false);
  const [Playlist, setPlaylist] = useState({ musicas: [] });
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { id } = useParams();
  const isLogged = props.isLogged;
  var songPlay = "";
  var songPause = "";
  var playlistObj;
  var songPlay = "";
  var songTitles = "";
  var songArtist = "";
  var songAlbum = "";
  var dataAdicao = "";
  var songDelete = "";
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio());
  useEffect(() => {
    axios.get(`http://localhost:5000/playlists/${id}`).then((res) => {
      setPlaylist(res.data);
      //console.log(currentUser.playlists)
    });
  }, []);
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [currentAudio]);
  playlistObj = Playlist;
  songPlay = playlistObj.musicas.map((o) => (
    <li>
      <button onClick={() => PlaySong(o.song, o.id)} className="button">
        {currentSong === o.song ? (
          <i className="fa fa-pause"></i>
        ) : (
          <i className="fa fa-play"></i>
        )}
      </button>
    </li>
  ));
  /* songPause = playlistObj.musicas.map((o) => (
    <li>
      <button onClick={() => PlaySong(o.song, o.id)} className="button">
        <i className="fa fa-pause"></i>
      </button>
    </li>
  )); */
  songTitles = playlistObj.musicas.map((o) => (
    <li>
      <h5>{o.title}</h5>
    </li>
  ));
  songArtist = playlistObj.musicas.map((o) => (
    <li>
      <h5>{o.artist}</h5>
    </li>
  ));
  songAlbum = playlistObj.musicas.map((o) => (
    <li>
      <h5>{o.album}</h5>
    </li>
  ));
  dataAdicao = playlistObj.musicas.map((o) => (
    <li>
      <h5>{o.dataAdicao}</h5>
    </li>
  ));
  songDelete = playlistObj.musicas.map((o) => (
    <li>
      <button className="button" onClick={() => deleteSong(o._id)}>
        <i className="fa fa-trash"></i>
      </button>
    </li>
  ));

  const deleteSong = (songId) => {
    var aux = Playlist;
    console.log("before");
    console.log(aux);
    aux.musicas.splice(
      aux.musicas.findIndex((o) => {
        return o._id == songId;
      }),
      1
    );
    console.log(aux);

    axios.put(`http://localhost:5000/playlists/${id}`, aux);
  };
  const PlaySong = (song, songId) => {
    if (currentSong === song) {
      let aux = Playlist;
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
        setCurrentSong(null);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
    } else {
      if (currentAudio) {
        currentAudio.pause();
      }

      const audioElement = new Audio(`/music/${song}`);
      audioElement.volume = 0.5;
      audioElement.play();

      setCurrentAudio(audioElement);
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="sideArea">
        <img src={`/images/${playlistObj.capa}`} alt="cannot display"></img>
        <div className="coluna">
          <h1>{playlistObj.name}</h1>
          <h4>{playlistObj.descricao}</h4>
          <div className="linha">
            <h4>{playlistObj.autor}</h4>
            <h4>{playlistObj.quantidadeFaixas}</h4>
            <h4>
              <i className="fa fa-heart"></i> {playlistObj.quantidadeCurtidas}
            </h4>
            {isLogged ? (
              <Link to={`/AddSongs/${id}`} className="add">
                <h4>Adicionar Musicas</h4>
              </Link>
            ) : (
              <h4>Playlist default</h4>
            )}
          </div>
        </div>
      </div>
      <div className="musicArea">
        <table>
          <tr>
            <th>
              <h6>#</h6>
            </th>
            <th>
              <h6>Título</h6>
            </th>
            <th>
              <h6>Artista</h6>
            </th>
            <th>
              <h6>Album</h6>
            </th>
            <th>
              <h6>Adicionado em</h6>
            </th>
            <th>
              <h6>-</h6>
            </th>
          </tr>
          <tr>
            <td width="10%">{songPlay}</td>
            <td width="40%">{songTitles}</td>
            <td>{songArtist}</td>
            <td>{songAlbum}</td>
            <td width="13%">{dataAdicao}</td>
            <td>{songDelete}</td>
          </tr>
        </table>
      </div>
    </>
  );
}
export default Playlistdetail;