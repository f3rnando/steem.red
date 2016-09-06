import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="column">
                    <div className="float-right"><a href="#" onClick={e => {e.preventDefault(); alert(process.env.VERSION)}}>Versión</a></div>
                    <h2>Acerca de Steem.red</h2>
                    <p>
                        Steem.red es un sitio web que está basado en la plataforma Steem y desarrollado a partir del clonado y modificación de Steemit.com (Open Source), una red social de contenido donde todos reciben pagos por la creación y curado de contenido. Utiliza un robusto sistema de puntaje, llamado Steem, que soporta valor real para premios digitales a través del descubrimiento de precios de mercado y liquidez.
                        <a href="https://steem.io/">Leer más en steem.io</a>.
                    </p>
                    <h2>Recursos</h2>
                    <h3><a href="https://github.com/f3rnando/steem-whitepaper/blob/master/Steem-Whitepaper/es/WhitePaper.pdf"  onClick={this.navigate}>Steem Whitepaper (español)</a> <small>[PDF]</small></h3>
                    <h3><a href="https://steem.io/SteemWhitePaper.pdf" onClick={this.navigate}>Steem Whitepaper (inglés, original)</a> <small>[PDF]</small></h3>
                    <h3><a href="http://steem.herokuapp.com" target="_blank">Chat en Slack</a></h3>
                </div>
            </div>
        );
    }
}

module.exports = {
    path: 'about.html',
    component: About
};
