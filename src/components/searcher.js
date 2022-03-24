import React from 'react';
import '../App.css'; 
import './searcher.css'; 

function Searcher() { 
    return ( 
        <>
            <div className='mains'>  
                <h1>Como podemos ajudar?</h1> 
                <div className='searcharea'> 
                    <input type="text" placeholder='Pesquise uma duvida'></input> 
                    <button></button>
                </div>
            </div>    
        </>
    )
} 

export default Searcher;