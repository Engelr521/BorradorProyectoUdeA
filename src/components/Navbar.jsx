import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  // Autenticacion por google
  const { loginWithRedirect } = useAuth0();
  // Salir de la autenticacion de google
  const { logout } = useAuth0();

  const {user, isAuthenticated} = useAuth0 ();

  return (
    <nav class="navbar navbar-light bg-light fixed-top ">
      <div class="container-fluid ">
        <a class="navbar-brand" href="/index">Concesionario</a>
        

        {/* // boton para ver quien esta logueado en el momento */}
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button class="btn btn-outline-success" type="submit"  > {isAuthenticated ? user.name : "User"} </button>
        </form>

        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">DevOnfire</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active " aria-current="page" href="/admin">Admin</a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  href="/Registro">Registro</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={() => loginWithRedirect()}>Login Google</a>
                {/* <a class="nav-link"  href="/Registro">Registro</a> */}
              </li>
              <li class="nav-item">
                { isAuthenticated ? <a class="nav-link" href="#" onClick={() => logout({ returnTo: window.location.origin })}>LogOut</a> : null}
                
              </li>
              
            </ul>
            
          </div>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
