import React from 'react';
import './Rodape.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Rodape() {
  return (
      <div className='Rodape-container'>

        <div class='Rodape-links'>
          <div className='Rodape-link-wrapper'>
            <div class='Rodape-link-items'>
              <h2>Sobre nós</h2>
              <Link to='/'>Como funcionamos</Link>
              <Link to='/'>Termos de Serviço</Link>
            </div>
            <div class='Rodape-link-items'>
              <h2>Entre em contato</h2>
              <Link to='/'>Contato</Link>
              <Link to='/'>Suporte</Link>
              <Link to='/FAQ'>FAQ</Link>

            </div>
          </div>
          <div className='Rodape-link-wrapper'>

            <div class='Rodape-link-items'>
              <h2>Social Media</h2>
              <Link to='/'>Instagram</Link>
              <Link to='/'>Facebook</Link>
              <Link to='/'>Youtube</Link>
              <Link to='/'>Twitter</Link>
            </div>
          </div>
        </div>
        <section class='social-media'>
          <div class='social-media-wrap'>
            <div class='Rodape-logo'>
              <Link to='/' className='social-logo'>
                Spotifly
                <i class='fab' />
              </Link>
            </div>
            <small class='website-rights'>Spotifly © 2022</small>
            <div class='social-icons'>
              <Link
                  class='social-icon-link facebook'
                  to='/'
                  target='_blank'
                  aria-label='Facebook'
              >
                <i class='fab fa-facebook-f' />
              </Link>
              <Link
                  class='social-icon-link instagram'
                  to='/'
                  target='_blank'
                  aria-label='Instagram'
              >
                <i class='fab fa-instagram' />
              </Link>
              <Link
                  class='social-icon-link youtube'
                  to='/'
                  target='_blank'
                  aria-label='Youtube'
              >
                <i class='fab fa-youtube' />
              </Link>
              <Link
                  class='social-icon-link twitter'
                  to='/'
                  target='_blank'
                  aria-label='Twitter'
              >
                <i class='fab fa-twitter' />
              </Link>
              <Link
                  class='social-icon-link twitter'
                  to='/'
                  target='_blank'
                  aria-label='LinkedIn'
              >
                <i class='fab fa-linkedin' />
              </Link>
            </div>
          </div>
        </section>
      </div>
  );
}

export default Rodape;
