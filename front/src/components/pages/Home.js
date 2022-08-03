import React from 'react';
import '../../App.css';

import Meio from '../Meio';

function Home(props) {

  //props.setEstaLogado(false); 
  return (
    <>
      <Meio isLogged={props.isLogged} loggedId={props.loggedId}/>
    </>
  ); 
}

export default Home;
