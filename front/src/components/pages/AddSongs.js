import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../SearchResults.css";
import "../AddSong.css";
import SearchBar from "../SearchBar";
import axios from "axios";

function AddSongs(props) {
  const { results } = useParams();
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [musicas, setMusicas] = useState([]);
  const { id } = useParams();
  const [audio, setAudio] = useState(new Audio());
  const [Playlist, setPlaylist] = useState({ musicas: [] });
  const [addedSongs, setAddedSongs] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/playlists/${id}`).then((res) => {
      setPlaylist(res.data);
      setAddedSongs(res.data.musicas);
    });
    axios.get("http://localhost:5000/musicas").then((res) => {
      setMusicas(res.data);
    });
  }, []);

  const PlaySong = (song) => {
    if (playing) {
      setAudio(audio.pause());
      setPlaying(false);
    } else {
      setAudio(new Audio(`/music/${song}`));
      if (!isNaN(audio.duration)) {
        audio.pause();
        audio.play();
        setPlaying(true);
      }
    }
  };

  const addSong = (songId) => {
    const song = musicas.find((o) => o._id === songId);
    if (song) {
      const isAlreadyAdded = addedSongs.some((addedSong) => addedSong._id === songId);
      if (!isAlreadyAdded) {
        const updatedPlaylist = { ...Playlist, musicas: [...Playlist.musicas, song] };
        axios.put(`http://localhost:5000/playlists/${id}`, updatedPlaylist).then((res) => {
          setPlaylist(updatedPlaylist);
          setAddedSongs([...addedSongs, song]);
          // Show an alert or notification here to indicate that the song was added
          alert(`Song "${song.title}" added to the playlist!`);
        });
      }
    }
  };

  const isSongAdded = (songId) => {
    return addedSongs.some((addedSong) => addedSong._id === songId);
  };

  const songsListed = musicas.map((o, i) => (
    <div className="song-item" key={o._id}>
      <li>
        <button onClick={() => PlaySong(o.song)} className="button">
          <i className="fa fa-play"></i>
        </button>
        {o.title}
        <button onClick={() => addSong(o._id)} className="button">
          {isSongAdded(o._id) ? <i className="fa fa-check"></i> : <i className="fa fa-plus"></i>}
        </button>
      </li>
    </div>
  ));

  return (
    <>
      <div className="App">
        <SearchBar placeholder="Pesquisar músicas, artistas, podcasts..." data={musicas} addsongs={true} playlistId={id} />
      </div>
      <div className="musicArea">
        <h1>Adicione músicas à sua playlist</h1>
        <table>
          <thead>
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
                <h6>Álbum</h6>
              </th>
              <th>
                <h6>Adicionado em</h6>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{songsListed}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AddSongs;
