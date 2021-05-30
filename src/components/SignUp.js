import React, {useState} from 'react';
import './Login.css'
import {registrar} from "../Servicio/auth";


const SignUp = () => {

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    function registro(event) {
        event.preventDefault();
        registrar(usuario,password);
    }

    return (
        <div class="container">
        <form>
        <div class="col text-center">
            <h3>Registro</h3>
        </div>
            <div className="form-group">
                <label>Nombre de Usuario</label>
                <input type="text" onChange={event => {setUsuario(event.target.value)}} className="form-control" placeholder="Cree un usuario" />
            </div>

            <div className="form-group">
            <label>Password</label>
            <input type="password" onChange={event => {setPassword(event.target.value)}} className="form-control" placeholder="Cree su password" />
        </div>

            <button onClick={event => {registro(event)}} className="btn btn-primary btn-block">Registrar</button>
        </form>
        </div>
    );
}

export default SignUp;
