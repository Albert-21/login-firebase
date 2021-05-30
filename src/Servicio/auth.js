import API from "./api";


const iniciarSesion = function (usuario,contraseña) {
     sessionStorage.setItem('user',usuario)
    usuario = {
        "username": usuario,
        "password": contraseña
    }
    API.post('/user/login',usuario).then(
        res => {
            console.log(res.data)
            sessionStorage.setItem('token',res.data.data.token)
        });

}
const registrar = function (usuario,contraseña) {
    usuario = {
        "username": usuario,
        "password": contraseña
    }
    API.post('/user/signup', usuario)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log("Usuario ya registrado");
        });
}
export {iniciarSesion,registrar};
