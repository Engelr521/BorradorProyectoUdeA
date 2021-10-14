
import React, {useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// base de datos de vehiculos, simula el backend
const vehiculosBackEnd = [
    {
        nombre:"Corolla",
        marca:"Toyota",
        modelo: 2015,
    },
    {
        nombre:"Sandero",
        marca:"Renault",
        modelo: 2020,
    },
    {
        nombre:"Rav4",
        marca:"Toyota",
        modelo: 2021,
    },
    {
        nombre:"Fiesta",
        marca:"Ford",
        modelo: 2017,
    },
    {
        nombre:"Mazda 3",
        marca:"Mazda",
        modelo: 2020,
    },
];




const Vehiculos = () => {
    
    
    // Estado para poder cambios dentro del la lista de vehiculosBackEnd
    const [carros, setCarros] = useState ([]);


    // useEffect Vacio que es el que se encarga de traer los datos de la BD
    useEffect(()=>{
        // obtener lista de vehiculos desde backend
        setCarros(vehiculosBackEnd)
    },[])


    

    // variables de los input para modificar y almacenar
    const [nombre, setNombre] = useState()
    const [marca, setMarca] = useState()
    const [modelo, setModelo] = useState()

    //Funcion enviar al BackEnd
    const enviarBackEnd = () => {
        // linea me permite el envio de los datos caprutados por el input y enviarlos al listado
        setCarros ([...carros,{nombre:nombre,marca:marca,modelo:modelo}]);
        // hacer al llamado del mensaje cuando se realiza la opcion de guardado de vehiculo nuevo.
        toast.success('Vehiculo creado con exito!!')    
        
        // aqui tambien podemos hacer la diferentes valdaciones para poder efectual el envio de la infromacion

    }

    return (
        <div>
            <form>
                <h1 className = "d-flex justify-content-center" >Formulario De Creacion De Vehiculos</h1>
                <div class="form-group">
                    <label htmlFor = 'nombre' for="formGroupExampleInput">Vehiculo</label>
                    <input name = 'nombre' type="text" className ="form-control pt-1" id="formGroupExampleInput" placeholder="Nombre del vehiculo" value={nombre} onChange = {(e)=>{setNombre(e.target.value);}} ></input>
                </div>
                <div className ="form-group pt-2">
                    <label htmlFor = 'marca' for="formGroupExampleInput2">Marca</label>
                    <input name = 'marca' type="text" className ="form-control " id="formGroupExampleInput2" placeholder="Marca del vehiculo" value={marca} onChange = {(e)=>{setMarca(e.target.value);}} ></input>
                </div>
                <div className ="form-group pt-2">
                    <label htmlFor = 'modelo' for="formGroupExampleInput2">Modelo</label>
                    <input name = 'modelo' type="text" className ="form-control" id="formGroupExampleInput2" placeholder="Modelo del vehiculo" value={modelo} onChange = {(e)=>{setModelo(e.target.value);}}></input>
                </div>
                <div>
                <button type="button" className ="btn btn-primary mt-2" onClick = {() => {enviarBackEnd();}} >Guardar Vehiculo</button>
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
                        <th scope="col" className="text-center">Descripción</th>
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
                                            aria-label="Descripción" aria-describedby="basic-addon1"></input>
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
                                    aria-label="Descripción" aria-describedby="basic-addon1"></input>
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
                                    aria-label="Descripción" aria-describedby="basic-addon1"></input>
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