import { useEffect, useState } from "react"
import Client from "../components/Client";

const Init = () => {

  const [ clientes, setClientes ] = useState([]);

  useEffect( () => {

    const obtenerClientesAPI = async () => {

      try {

        const url = 'http://localhost:4000/clientes';

        // AQUI NO ES NECESARIO PASARLE EL OBJETO CON LA CONFIGURACIÓN YA QUE POR DEFECTO APLICA EL MÉTODO GET, SI QUISIERA OTRO METODO SI TENGO QUE HACERLO COMO LO HICE EN MYFORM CON EL MÉTODO POST
        const respuesta = await fetch( url );
        const resultado = await respuesta.json();
        
        setClientes( resultado );

      } catch( error ) {
        console.log( error );
      }


    };
    obtenerClientesAPI();

  }, [] );

  const handleEliminar = async id => {
    const resp = confirm('¿Deseas eliminar este cliente?');
    
    if ( resp ) {

      try {

        const url = `http://localhost:4000/clientes/${id}`;

        const respuesta = await fetch( url, {
          method: 'DELETE'
        })

        await respuesta.json();

        const arrayClientes = clientes.filter( cliente => cliente.id !== id );
        setClientes( arrayClientes );

      } catch( error ) {
        console.log( error );
      }

    }

  }

  return (
    <>
      <h1 className="font-black text-3xl text-blue-900">Clientes Registrados</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">

        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          { clientes.map( cliente => (
            <Client 
              key = { cliente.id }
              cliente = { cliente }
              handleEliminar = { handleEliminar }
            />
          ))}
        </tbody>

      </table>

  </>
  )
}

export default Init
