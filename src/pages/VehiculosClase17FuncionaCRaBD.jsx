
import React, {useEffect, useState, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';




// base de datos de vehiculos, simula el backend
// const vehiculosBackEnd = [
//     {
//         nombre:"Corolla",
//         marca:"Toyota",
//         modelo: 2015,
//     },
//     {
//         nombre:"Sandero",
//         marca:"Renault",
//         modelo: 2020,
//     },
//     {
//         nombre:"Rav4",
//         marca:"Toyota",
//         modelo: 2021,
//     },
//     {
//         nombre:"Fiesta",
//         marca:"Ford",
//         modelo: 2017,
//     },
//     {
//         nombre:"Mazda 3",
//         marca:"Mazda",
//         modelo: 2020,
//     },
// ];




const Vehiculos = () => {
    
    
    // Estado para poder cambios dentro del la lista de vehiculosBackEnd
    const [carros, setCarros] = useState ([]);


    // useEffect Vacio que es el que se encarga de traer los datos de la BD
    useEffect(() => {
        // const obtenerVehiculos = async () => {

        // obtener lista de vehiculos desde backend con el metodo GET de la API
        const options = {method: 'GET', url: 'http://localhost:5000/vehiculos'};

        // axios me devuelve las informaciones del backend solicitadas en el metodo GET 
        axios
            .request(options)
            .then(function (response) {
                setCarros(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });

        // setCarros([]);
    },[]);


    

    // funcion de referencia al formulario de creacion de vehiculos
    const form = useRef(null);

    
    //funcion para cargar  los datso de las variables de los input en un json del formulario de creacion de vehiculos y enviarlos al backend
    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        // saca los datos del los input en un forEach, para esto toa poner la variable name en cada uno de los inputs
        const nuevoVehiculo = {};
        fd.forEach((value, key) => {
            nuevoVehiculo[key] = value;
        });

        // en estas opciones se piede definir el metodo para enviar la informacion con POST al BackEnd
        const options = {
            method: 'POST',
            url: 'http://localhost:5000/vehiculos/nuevo',
            headers: {'Content-Type': 'application/json'},
            data: {nombre: nuevoVehiculo.nombre, marca: nuevoVehiculo.marca, modelo: nuevoVehiculo.modelo},
        };

        await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success('Vehiculo creado con exito!!'); 
          }).catch(function (error) {
            console.error(error);
            toast.error('Error creando el vehiculo!!'); 
          });
        //
              


        // setCarros([...carros, nuevoVehiculo]); 
        // // identificar el caso de exito y mostrar el toast de exito
        // toast.success('Vehiculo creado con exito!!'); 
        // // identificar el caso de error y mostrar el toast de error
    };

    return (
        <div>
            <form ref = {form} onSubmit = {submitForm} >
                <h1 className = "d-flex justify-content-center" >Formulario De Creacion De Vehiculos</h1>
                <div class="form-group">
                    <label htmlFor = 'nombre' for="formGroupExampleInput">Vehiculo</label>
                    <input name = 'nombre' type="text" className ="form-control pt-1" id="formGroupExampleInput" placeholder="Nombre del vehiculo" required ></input>
                </div>
                <div className ="form-group pt-2">
                    <label htmlFor = 'marca' for="formGroupExampleInput2">Marca</label>
                    <input name = 'marca' type="text" className ="form-control " id="formGroupExampleInput2" placeholder="Marca del vehiculo"  required ></input>
                </div>
                <div className ="form-group pt-2">
                    <label htmlFor = 'modelo' for="formGroupExampleInput2">Modelo</label>
                    <input name = 'modelo' type="text" className ="form-control" id="formGroupExampleInput2" placeholder="Modelo del vehiculo" required ></input>
                </div>
                <div>
                <button type="submit" className ="btn btn-primary mt-2"  >Guardar Vehiculo</button>
                </div>
            </form>
            <br/>
            {/* mensaje de toastify para ver la accion realizada. */}
            <ToastContainer position="bottom-center" autoClose={5000} />
            <h1 className = "d-flex justify-content-center" >Vehiculos Base Datos</h1>
            <table className="table table-striped table-hover align-middle table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col" className="text-center">id</th>
                        <th scope="col" className="text-center">Descripci??n</th>
                        <th scope="col" className="text-center">Valor Unitario</th>
                        <th scope="col" className="text-center">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {/* // me permite visualizar la base de datos del backend, en esta caso el diccionaro que temenos arriba */}
                    {carros.map((carros) => {
                        return (
                            <tr>
                                <th scope="row" className="align-middle">1</th>
                                <td>
                                    <div className="input-group justify-content-center">
                                        <input type="text" className="form-control-tabla" placeholder= {carros.nombre}
                                            aria-label="Descripci??n" aria-describedby="basic-addon1"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="input-group justify-content-center mb-6">
                                        <input type="number" className="form-control-tabla" placeholder={carros.marca} aria-label="Precio" aria-describedby="basic-addon1"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="input-group justify-content-center mb-6">
                                        <input type="number" className="form-control-tabla" placeholder={carros.modelo} aria-label="Precio" aria-describedby="basic-addon1"></input>
                                        {/* <select className="form-select" id="inputGroupSelect01">
                                            <option selected>...</option>
                                            <option value="1">Activo</option>
                                            <option value="2">Inactivo</option>
                                        </select> */}
                                    </div>
                                </td>
                            </tr>

                        );
                    })}
                    
                    <tr>
                        <th scope="row">2</th>
                        <td>
                            <div className="input-group justify-content-center mb-6">
                                <input type="text" className="form-control-tabla" placeholder="Salsa de Tomate" 
                                    aria-label="Descripci??n" aria-describedby="basic-addon1"></input>
                            </div>
                        </td>
                        <td>
                            <div className="input-group justify-content-center mb-6">
                                <input type="number" className="form-control-tabla" placeholder="2300"
                                    aria-label="Precio" aria-describedby="basic-addon1"></input>
                            </div>
                        </td>
                        <td>
                            <div className="input-group justify-content-center mb-6">
                                <select className="form-select" id="inputGroupSelect01">
                                    <option  disabled >...</option>
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>
                            <div className="input-group justify-content-center mb-6">
                                <input type="text" className="form-control-tabla" placeholder="Queso"
                                    aria-label="Descripci??n" aria-describedby="basic-addon1"></input>
                            </div>
                        </td>
                        <td>
                            <div className="input-group justify-content-center mb-6">
                                <input type="number" className="form-control-tabla" placeholder="7000"
                                    aria-label="Precio" aria-describedby="basic-addon1"></input>
                            </div>
                        </td>
                        <td>
                            <div className="input-group justify-content-center mb-6">
                                <select className="form-select" id="inputGroupSelect01">
                                    <option selected>...</option>
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Vehiculos;