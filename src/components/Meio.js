import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Meio.css';
function Meio() {
  //note to self the ` sign its a string which you can put stuff on
  return (
    <div className='hero-container' >
      <div className='heading'>
        <h1>A música que tem em você</h1>
        <p>O que está esperando?</p>

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
  );
}

export default Meio;
