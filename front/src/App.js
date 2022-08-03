import React from 'react';
import Cabecalho from './components/Cabecalho';
import './App.css';
import Home from './components/pages/Home'; 
import Rodape from './components/Rodape';
import { BrowserRouter as Router, Routes, Switch, Route } from 'react-router-dom';
import FAQ from './components/pages/FAQ';
import PlaylistPage from './components/pages/Playlists';
import SignUp from './components/pages/SignUp'; 
import Playlistdetail from './components/pages/playlistdetail';
import Login from './components/pages/Login'; 
import Profile from './components/pages/Profile'; 
import Change from './components/pages/Change';
import { useState } from 'react'; 
import SearchResults from './components/pages/SearchResults';
import AddSongs from './components/pages/AddSongs';
function App() { 
  const [isLogged,setIsLogged]=useState(false)
  const [audio,setAudio]=useState({}) 
  const [playing,setPlaying]=useState(false) 
  const [loggedId,setLoggedId]=useState("-1")
  return (
    <>
      <Router>
        <Cabecalho isLogged={isLogged} setIsLogged={setIsLogged} loggedId={loggedId} setLoggedId={setLoggedId} />
         <Routes>
          <Route path='/' exact element={<Home isLogged={isLogged}  setIsLogged={setIsLogged} loggedId={loggedId}/>} />
          <Route path='/FAQ' element={<FAQ  isLogged={isLogged} loggedId={loggedId}/>} />
          <Route path='/sign-up' element={<SignUp isLogged={isLogged} />} />
          <Route path='/Playlists' element={<PlaylistPage isLogged={isLogged} loggedId={loggedId} />}/>
          <Route path='/playlistdetail/:id'  element={<Playlistdetail isLogged={isLogged} loggedId={loggedId} audio={audio} setAudio={setAudio} playing={playing} setPlaying={setPlaying}/>} />
          <Route path='/Login'  element={<Login setIsLogged={setIsLogged} isLogged={isLogged} loggedId={loggedId} setLoggedId={setLoggedId}/>}/> 
          <Route path='/Profile' element={<Profile loggedId={loggedId}/>} />
          <Route path='/Change/:id' element={<Change loggedId={loggedId}/>} />
          <Route path='/SearchResults/:results/:playlistId' element={<SearchResults loggedId={loggedId} audio={audio} setAudio={setAudio} playing={playing} setPlaying={setPlaying}/>}></Route>
          <Route path='/SearchResults/:results' element={<SearchResults loggedId={loggedId} audio={audio} setAudio={setAudio} playing={playing} setPlaying={setPlaying}/>}></Route>
          <Route path='/AddSongs/:id' element={<AddSongs loggedId={loggedId} audio={audio} setAudio={setAudio} playing={playing} setPlaying={setPlaying}/>}></Route>
          
        </Routes> 
        <Rodape />
      </Router>
    </>
  );
}

export default App;
