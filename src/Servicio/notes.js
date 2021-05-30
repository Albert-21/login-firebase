import API from "./api";
import swal from "sweetalert";
let DATOS = [];
function guardarNota(nota) {
    nota = {
        "username": sessionStorage.getItem('user'),
        "note":nota
    }
    API.post('notes/add',nota,{
        headers: {
            'auth-token': sessionStorage.getItem('token')
        }
    } ).then(res =>{
        console.log(res.data)

            swal({
                title: "Proceso Exitoso...",
                text: "La nota se guardo correctamente",
                icon: "success",
                buttons: true,
            })
                .then((res) => {
                    if (res) {

                    } else {
                        swal({
                            title: "Error...",
                            text: "no se pudo completar la operacion",
                            icon: "error",
                            buttons: true,
                        });
                    }
                });

    }
    ).catch(error =>{
        console.log(error.message)
    })

}

function mostarNotas(username) {
     var  data ={
         username: username
    }
    API.post('notes/findAll',data,{
        headers: {
            'auth-token': sessionStorage.getItem('token')
        }
    } ).then(res =>{
        console.log(res.data)
        DATOS = res.data.data;
        }
    ).catch(error =>{
        console.log(error.message)
    })

}
 function borrarNota(id){

    API.delete('notes/deleteNota/'+id,{
            headers: {
                'auth-token': sessionStorage.getItem('token')
            }
        }
    ).then(res =>{
        console.log(res.data.data);
        }
    ).catch(error =>{
        console.log(error.message)
    })

}

export {guardarNota,mostarNotas,DATOS,borrarNota}
