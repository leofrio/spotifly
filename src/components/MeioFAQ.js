import React from 'react';
import '../App.css';
import './MeioFAQ.css';
import Faq from "react-faq-component";



const data = {
    title: "Perguntas Frequentes", 
    rows: [
        {
            title: "Meu dispositivo não está conectando oque fazer?",
            content: "se estiver dando certo em outros dispositivos, tente ver se a verão do seu aparelho é suportada pelo spotifly",
        },
        {
            title: "Não lembro da senha, oque Fazer?",
            content:
                "Temos uma sessão de recuperar a senha",
        },
        {
            title: "musicas estão com pessima qualidade e minha internet esta boa",
            content: `verifique se o site não esta em manutenção ou se é algum problema do seu aparelho`,
        },
        {
            title: "Porque escolher spotifly?",
            content: <p>spotifly é amor, spotifly é vida</p>,
        },
    ],
};

const styles = {
    // bgColor: 'white',
    titleTextColor: "white",
    rowTitleColor: "white",
    // rowContentColor: 'grey',
    // arrowColor: "red",
    bgColor: "#1C1B1B"
}

const config = {
     animate: true,
     //arrowIcon: "V", 
     tabFocus: true
};

export default function App() {

    return ( 
        <div className='thewhole'>
            <div className="main">  
            <h1>Como Podemos Ajudar?</h1> 
            <sub><p>A Equipe tecnica do Spotifly sempre está a disposição para voce, mas antes dê uma olhada nas nossas 
                Questões Mais Frequentes </p></sub>
                <Faq
                    data={data}
                    styles={styles}
                    config={config}
                />
            </div> 
        </div>
    );
}

