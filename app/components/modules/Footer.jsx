import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';

const Footer = props => (
    <footer className="Footer row expanded">
        <div className="large-6 columns">
            <ul className="menu">
               <li><Link to="/about.html">Acerca de...</Link></li>
               <li><Link to="/privacy.html" rel="nofollow">Política de privacidad</Link></li>
               <li><Link to="/tos.html" rel="nofollow">Términos del servicio</Link></li>
               <li><Link to="/~witnesses">Testigos</Link></li>
            </ul>
        </div>
        <div className="large-6 columns">
            <div className="Footer__section float-right">
            </div>
        </div>
    </footer>
)

Footer.propTypes = {
}

export default connect(state => {
    return {
    };
})(Footer);
