import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { authFirebase, storage } from '../firebase/firebase';
import './Galeria.css'


const Galeria = () => {
    const history = useHistory();

    const [image, setImage] = useState(null);
    const [allImages, setImages] = useState([]);

    useEffect(() => {
         mostrarImagenes()
    });


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
            const storageRef = storage.ref(localStorage.getItem('usuario'));
            const imageRef = storageRef.child(image.name);
            imageRef.put(image).then(() => {
                storage
                    .ref(localStorage.getItem('usuario'))
                    .child(image.name)
                    .getDownloadURL()

                    .then((url) => {
                        if (allImages.indexOf(url) < 0) {
                            setImages((allImages) => [...allImages, url]);
                            mostrarImagenes()
                        }
                        console.log(allImages);
                        alert("Se guardo correctamente la imagen");
                    });
            });
        } else {
            alert("Guarde primero una imagen");
        }
    };

    const mostrarImagenes = () => {
        let storageRef = storage.ref(`${localStorage.getItem('usuario')}`);
        console.log(allImages);

        storageRef
            .listAll()
            .then(function (res) {
                res.items.forEach((imageRef) => {
                    imageRef.getDownloadURL().then((url) => {
                        if (allImages.indexOf(url) === -1) {
                            setImages((allImages) => [...allImages, url]);
                        }
                    });
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const borrarImagen = (url) => {
        let pictureRef = storage.refFromURL(url);
        pictureRef
            .delete()
            .then(() => {
                setImages(allImages.filter((image) => image !== url));
                alert("Se ha borrado la imagen!");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const haudlLogut = () => {
        authFirebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('usuario')
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
            {!localStorage.getItem('usuario') ? <Redirect to='/login' /> :
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
