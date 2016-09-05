import React from 'react';

class Support extends React.Component {
    render() {
        return (
            <div className="row">
                <div>
                    <h2>Soporte de Steem.red</h2>
                    <p>
                        Envía tu consulta o pregunta a <a href="mailto:soporte@steem.red">soporte@steem.red</a>.
                    </p>
                </div>
            </div>
        );
    }
}

module.exports = {
    path: 'support.html',
    component: Support
};
