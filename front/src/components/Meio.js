import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { Button } from './Button'; 
import './Meio.css';


function Meio(props) {
  //note to self the ` sign its a string which you can put stuff on
  const isLogged=props.isLogged 
  const loggedId=props.loggedId
  const [currentUser,setCurrentUser]=useState({})   

  useEffect(() => {
    var auxer= (loggedId == "-1") ? "" : loggedId
    axios.get(`http://localhost:5000/users/${auxer}`).then( (res) => {
            setCurrentUser(res.data)
        }
  )},[])
  if(isLogged) {    
    console.log("AAAAAA")
    /* axios.get(`http://localhost:5000/users/${loggedId}`).then( (res) => {
            setCurrentUser(res.data)
        }
    ) */
    return( 
      <>
      <h1 style={{color:"black"}}>Bem vindo {currentUser.name}</h1>
      </>
    )
  } 
  else {
    return (
      <> 
      <div className='hero-container' >
        <div className='heading'>
          <h10>Escutar muda tudo</h10>
          <h2>
            <p><span id="spin"></span>? Temos.</p></h2>

          <div className='hero-btns'>
            <Button
                className='btns'
                buttonSize='btn--large'
                buttonStyle="btn--outline"
            >
              Começar agora
            </Button>

          </div>
        </div>
      </div> 
      </>
    );
  }
}

export default Meio;
