import React, {useState} from 'react';
import { useHistory } from 'react-router';
import {borrarNota, DATOS, guardarNota, mostarNotas} from "../Servicio/notes";
import './Notas.css'
import swal from 'sweetalert';
import {storage} from "../firebase/firebase";

const Notas = () => {
    const options = {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", hour12:"false"};
    const history = useHistory();
    const [nota, setNota] = useState('');


    function guardar(event) {
        event.preventDefault()
        guardarNota(nota)

    }

    function cerrarSesion(event) {
        event.preventDefault()
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        history.push('/')
    }

    function mostrar(e) {
        e.preventDefault()
         mostarNotas(sessionStorage.getItem("user"))
    }
    function borrar(id) {

        swal({
            title: "Estas Seguro?",
            text: "¡Una vez eliminado, no podrá recuperar esta nota!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    borrarNota(id)
                    swal("¡Tu nota ha sido eliminada!", {
                        icon: "success",
                    });
                } else {
                    swal("Tu nota no ha sido eliminada");
                }
            });

    }

    return (
        <div className="container">
            <form>
                <div className="col text-center">
                    <h3>Notas</h3>
            <div className="form-group">

                <textarea type="text" onChange={event => {setNota(event.target.value)}} className="form-control" placeholder="Ingrese su Nota" />
            </div>

            <button onClick={event => {guardar(event)}} className="btn btn-primary btn-block">Guardar</button>
                    <button  onChange={mostrar} onClick={(e) => mostrar(e)} className="btn btn-primary btn-block">Mostrar</button>

                    <button className="btn-flotante" onClick={event => cerrarSesion(event)}><i className="fas fa-sign-out-alt"></i>Cerrar
                        Sesion
                    </button>
                </div>
            </form>
            <br/>
            <table class="table table-dark table-striped">
                <thead>
                <tr>
                    <th scope="col" className='invisible' >Id</th>
                    <th scope="col">Nota</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Opcion</th>
                </tr>
                </thead>
                <tbody>


                {
                    DATOS.map(nota => {
                        return(
                            <tr>
                                <th scope="row" className='invisible'>{nota._id}</th>
                                <td>{nota.note}</td>
                                <td>{new Date(nota.date).toLocaleDateString("es-US",options)}</td>
                                <th><button onClick={() => borrar(nota._id)} type="button" className="btn btn-primary btn-danger">
                                        <span className="btn-label">
                                            <i className="fas fa-trash-alt"></i>
                                        </span>Borrar
                                </button></th>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Notas;
