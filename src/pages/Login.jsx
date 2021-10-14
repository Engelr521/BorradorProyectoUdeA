import React from 'react';
import estilos from '../styles/estilos.css'


const Login = () => {
  return (
    <form className = "container-sm margin-top">
        <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="usuario@dominio.com"></input>
            <div id="emailHelp" class="form-text">Nunca compartiremos tu correo electrónico con nadie más.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder ="Contraseña"></input>
        </div>
        
        <button type="submit" class="btn btn-primary">Ingresar</button>
    </form>
  );
};

export default Login;