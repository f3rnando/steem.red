import React from 'react';
import {connect} from 'react-redux';
import SvgImage from 'app/components/elements/SvgImage';
import AddToWaitingList from 'app/components/modules/AddToWaitingList';

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {waiting_list: false};
    }
    render() {
        if ($STM_Config.read_only_mode) {
            return <div className="row">
                <div className="column">
                    <div className="callout alert">
                        <p>Debido a operaciones de mantenimiento Steem.red está en modo lectura únicamente. Lamentamos los inconvenientes.</p></div>
                </div>
            </div>;
        }
        
        if (this.props.serverBusy || $STM_Config.disable_signups) {
            return <div className="row">
                <div className="column callout" style={{margin: '20px', padding: '40px'}}>
                    <p>La membresía de Steem.red es actualmente sólo por invitación debido a la alta demanda inesperada.
                        Suscribite para recibir entrar a la lista de espera.</p>
                    <AddToWaitingList />
                </div>
            </div>;
        }

        return <div className="SignUp">
            <div className="row">
                <div className="column">
                    <h3>Registrarse</h3>
                    <p>Steem.red inicia cada cuenta con aproximadamente {this.props.signup_bonus} en Steem Power; para prevenir el abuso se requiere a los nuevos usuarios que accedan a través de otra plataforma social.<br />
                        Tu información personal se mantendrá <a href="/privacy.html" target="_blank">privada</a>.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="column large-4 shrink">
                    <SvgImage name="facebook" width="64px" height="64px" />
                </div>
                <div className="column large-8">
                    <a href="/connect/facebook" className="button SignUp--fb-button">Continuar con Facebook</a>
                </div>
            </div>
            <div className="row">
            &nbsp;
            </div>
            <div className="row hidden">
                <div className="column large-4 shrink">
                    <SvgImage name="reddit" width="64px" height="64px" />
                </div>
                <div className="column large-8">
                    <a href="/connect/reddit" className="button SignUp--reddit-button">Continuar con Reddit</a>
                    <br /><span className="secondary">(Requiere karma de comentarios positivo en Reddit)</span>
                </div>
            </div>
            <div className="row">
                <div className="column">
                      <br />
                    No tenés cuenta en Facebook o Reddit? <br />
                    {this.state.waiting_list ? <AddToWaitingList /> : <a href="#" onClick={() => this.setState({waiting_list: true})}>
                        <strong> Suscribite para recibir un aviso cuando la confirmación via SMS esté disponible.</strong>
                    </a>}
                </div>
            </div>
            <div className="row">
                <div className="column">
                      <br />
                    <p className="secondary">Al verificar tu cuenta aceptás los <a href="/tos.html" target="_blank">términos y condiciones</a> de Steem.red.</p>
                </div>
            </div>
        </div>
    }
}

export default connect(
    state => {
        return {
            signup_bonus: state.offchain.get('signup_bonus'),
            serverBusy: state.offchain.get('serverBusy')
        };
    }
)(SignUp);
