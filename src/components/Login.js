import React from 'react';
import { Redirect, useHistory } from 'react-router';
import { authFirebase, provider } from '../firebase/firebase';

const Login = () => {

    var usuario;

    const history = useHistory()


    const haudlAuth = () => {

        if (localStorage.getItem('usuarios')) {

            history.push('/photos')

        } else {
            authFirebase.auth().signInWithPopup(provider)
                .then((result) => {
                    console.log(usuario)
                    usuario = result.user
                    console.log(usuario)
                    console.log(usuario.email.slice(0, -10))
                    localStorage.setItem('usuario',usuario.email.slice(0, -10))    
                    history.push('/photos');
                    // ..
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode)
                    console.log(errorMessage)
                });

        }


    }


    return (
        <div>
            {localStorage.getItem('usuario') ? 
            <Redirect to='/photos' /> : 
            
            <div class="container">
                <div class="col text-center">
                    <br />
                    <button type="button" disabled = {!!localStorage.getItem('usuario')} onClick={haudlAuth} class="btn btn-light btn-lg btn-block" >
                        <span class="fab fa-google"></span>
                Registrate via Google
                </button>
                </div>

            </div>}
        </div>
    )

}

export default Login

