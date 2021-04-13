import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { authFirebase, storage } from '../firebase/firebase';
import './Galeria.css'
import swal from 'sweetalert';



const Galeria = () => {
    const history = useHistory();

    const [image, setImage] = useState(null);
    const [allImages, setImages] = useState([]);

    useEffect(() => {
        mostrarImagenes()
    }, []);


    const onImageChange = (e) => {
        const reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    console.log(file);
                    setImage(file);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setImage(null);
        }
    };
    const guardarImagen = () => {
        if (image) {
            const storageRef = storage.ref(sessionStorage.getItem('usuario'));
            const imageRef = storageRef.child(image.name);
            imageRef.put(image).then(() => {
                storage
                    .ref(sessionStorage.getItem('usuario'))
                    .child(image.name)
                    .getDownloadURL()

                    .then((url) => {
                        setImage(null);
                        swal({
                            title: "Proceso Exitoso...",
                            text: "La imagen se guardo Correctamente",
                            icon: "success",
                            buttons: true,
                        })
                            .then((guardado) => {
                                if (guardado) {
                                    mostrarImagenes()
                                } else {
                                    swal("A ocurrido un error");
                                }
                            });
                        mostrarImagenes()
                    });
            });
        } else {
            swal({
                title: "Error...",
                text: "Primero seleccione una imagen",
                icon: "warning",
                buttons: true,
            })}
    };

    const mostrarImagenes = () => {
        allImages.splice(0, allImages.length)
        let storageRef = storage.ref(`${sessionStorage.getItem('usuario')}`);
        storageRef
            .listAll()
            .then(function (res) {
                res.items.forEach((imageRef) => {
                    imageRef.getDownloadURL().then((url) => {
                        allImages.push(url)
                    });
                });
                console.log(allImages);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const borrarImagen = (url) => {

        swal({
            title: "Estas Seguro?",
            text: "¡Una vez eliminado, no podrá recuperar esta imagen!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let pictureRef = storage.refFromURL(url);
                    pictureRef
                        .delete()
                        .then(() => {
                            mostrarImagenes()
                        }).catch((err) => {
                            console.log(err);
                        });
                    swal("¡Tu imagen ha sido eliminada!", {
                        icon: "success",
                    });
                } else {
                    swal("Tu imagen no ha sido borrada");
                }
            });
    };

    const haudlLogut = () => {
        authFirebase.auth().signOut()
            .then(() => {
                sessionStorage.removeItem('usuario')
                setImages([])
                history.push('/login')
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            });

    }


    return (

        <div>
            {!sessionStorage.getItem('usuario') ? <Redirect to='/login' /> :
                <div>
                    <input type="file" onChange={(e) => {
                        onImageChange(e);
                    }} />
                    <button onClick={() => guardarImagen()} disabled={!image} class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"></path>
                        </svg>
                guardar
              </button>
                    <button class="btn-flotante" onClick={haudlLogut}><i class="fas fa-sign-out-alt"></i>Cerrar Sesion</button>

                    <div id="photos">
                        {allImages.map((image) => {
                            return (
                                <div key={image} className="image">
                                    <img src={image} alt="" />
                                    <button type="button" class="btn btn-labeled btn-danger" onClick={() => borrarImagen(image)}>
                                        <span class="btn-label">
                                            <i class="fas fa-trash-alt"></i>
                                        </span>Borrar</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            }


        </div>
    );
}

export default Galeria;
