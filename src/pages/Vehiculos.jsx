
import React, {useEffect, useState, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { nanoid } from 'nanoid';



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
    useEffect( () => {
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

    const FilaVehiculo = ({carros}) => {
        console.log("Carros", carros);
        const [edit, setEdit] = useState (false);

        // creacon de estados para la edicion de elementos en la tabla
        const [infoNuevoVehiculo, setInfoNuevoVehiculo] = useState ({
        
        nombre: carros.nombre,
        marca: carros.marca,
        modelo: carros.modelo,
        });

        //funcion para envio de edicion de informacion
        const actualizarVehiculo = async () => {
            console.log(infoNuevoVehiculo);
            // envio metodo PUT o PACH para actualizacion de informacion al BackEnd
            const options = {
                method: 'PACH',
                url: '#',
                headers: {'Content-Type': 'application/json'},
                data: {...infoNuevoVehiculo, id: carros._id},
            };

            await axios.request(options).then(function (response) {
                console.log(response.data);
                toast.success('Vehiculo modificado con exito!!');
                setEdit(false);
              }).catch(function (error) {
                console.error(error);
                toast.error('Error modificando el vehiculo!!'); 
              });
        }

        const eliminarVehiculo = async () => {
            const options = {
                method: 'DELETE',
                url: '#',
                headers: {'Content-Type': 'application/json'},
                data: { id: carros._id },
            };

            await axios.request(options).then(function (response) {
                console.log(response.data);
                toast.success('Vehiculo eliminado con exito!!');
                setEdit(false);
              }).catch(function (error) {
                console.error(error);
                toast.error('Error eliminando vehiculo el vehiculo!!'); 
              });
        }

        return (
            <tr>
                
                {edit ? 
                    <>
                    
                        {/* <th scope="row" className="input-group  justify-content-center">{carros._id.slice(20)}</th> */}
                        <td>
                            <div className="input-group justify-content-center">
                                <input 
                                    type="text" 
                                    className="form-control-tabla" 
                                    value = {infoNuevoVehiculo.nombre} 
                                    onChange = { (e) => setInfoNuevoVehiculo ({...infoNuevoVehiculo, nombre:e.target.value}) }
                                    aria-label="Descripción" aria-describedby="basic-addon1"> 
                                </input>
                            </div>
                        </td>
                        <td>
                            <div className="input-group justify-content-center mb-6">
                                <input 
                                    type="text" 
                                    className="form-control-tabla" 
                                    value = {infoNuevoVehiculo.marca} 
                                    onChange = { (e) => setInfoNuevoVehiculo ({...infoNuevoVehiculo, marca:e.target.value}) }
                                    aria-label="Precio" 
                                    aria-describedby="basic-addon1"> 
                                </input>
                            </div>
                        </td>
                        <td>
                            <div className="input-group justify-content-center mb-6">
                                <input 
                                    type="text" 
                                    className="form-control-tabla" 
                                    value = {infoNuevoVehiculo.modelo} 
                                    onChange = { (e) => setInfoNuevoVehiculo ({...infoNuevoVehiculo, modelo:e.target.value}) }
                                    aria-label="Precio" 
                                    aria-describedby="basic-addon1"> 
                                </input>
                                    {/* <select className="form-select" id="inputGroupSelect01">
                                        <option selected>...</option>
                                        <option value="1">Activo</option>
                                        <option value="2">Inactivo</option>
                                    </select> */}
                            </div>
                        </td>
                    
                    </>  
                :
                <>
                {/* <th scope="row" className="input-group  justify-content-center">{carros._id.slice(20)}</th> */}
                <td>
                    <div className="input-group justify-content-center">
                        {carros.nombre}
                        {/* <input 
                            type="text" 
                            className="form-control-tabla" 
                            value = {infoNuevoVehiculo.nombre} 
                            onChange = { (e) => setInfoNuevoVehiculo ({...infoNuevoVehiculo, nombre:e.target.value}) }
                            aria-label="Descripción" aria-describedby="basic-addon1"> 
                        </input> */}
                    </div>
                </td>
                <td>
                    <div className="input-group justify-content-center mb-6">
                    {carros.marca}
                        {/* <input 
                            type="text" 
                            className="form-control-tabla" 
                            value = {carros.marca} 
                            onChange = { (e) => setInfoNuevoVehiculo ({...infoNuevoVehiculo, marca:e.target.value}) }
                            aria-label="Precio" 
                            aria-describedby="basic-addon1"> 
                        </input> */}
                    </div>
                </td>
                <td>
                    <div className="input-group justify-content-center mb-6">
                        {carros.modelo}
                        {/* <input 
                            type="text" 
                            className="form-control-tabla" 
                            value = {carros.modelo} 
                            onChange = { (e) => setInfoNuevoVehiculo ({...infoNuevoVehiculo, modelo:e.target.value}) }
                            aria-label="Precio" 
                            aria-describedby="basic-addon1"> 
                        </input> */}
                            {/* <select className="form-select" id="inputGroupSelect01">
                                <option selected>...</option>
                                <option value="1">Activo</option>
                                <option value="2">Inactivo</option>
                            </select> */}
                    </div>
                </td>
                </>
                }
                <td>
                    <div className="input-group justify-content-around mb-6">
                        { edit ? (<i 
                                    className = "fas fa-check"
                                    onClick = {() => actualizarVehiculo()}  > </i>
                        ) : (
                        <i 
                            onClick = {() => setEdit(!edit)} 
                            className = "fas fa-pencil-alt" 
                            // onClick = { () => actualizarVehiculo() } 
                            > 
                        </i>
                        )}
                        <i 
                            className = "fas fa-trash"
                            onClick = {() => eliminarVehiculo()} 
                            >
                            
                        </i>
                    </div>
                </td>
            </tr>
        )
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
                        {/* <th scope="col" className="text-center">id</th> */}
                        <th scope="col" className="text-center">Descripción</th>
                        <th scope="col" className="text-center">Valor Unitario</th>
                        <th scope="col" className="text-center">Estado</th>
                        <th scope="col" className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* // me permite visualizar la base de datos del backend, en esta caso el diccionaro que temenos arriba */}
                    {carros.map((carros) => {
                        return (
                            
                                <FilaVehiculo key = {nanoid()} carros = {carros}/>
                            
                        )
                    })}
                                        
                </tbody>
            </table>
        </div>
    );
};

export default Vehiculos;