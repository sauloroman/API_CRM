import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const ViewClient = () => {

  const [ client, setClient ] = useState({})
  const [ cargando, setCargando ] = useState( true );

  const { id } = useParams();

  useEffect( () => {

    const obtenerClienteAPI = async () => {

      try {

        const url = `http://localhost:4000/clientes/${ id }`;

        const respuesta = await fetch( url );
        const resultado = await respuesta.json();
        
        setClient( resultado );

      } catch( error ) {
        console.log( error );
      }

      setCargando( !cargando );
    }

    obtenerClienteAPI();

  }, [])

  return (

    cargando ? <Spinner/> : (
        
      !Object.keys( client).length ? 
        <p className='text-center bg-white p-5 rounded-md shadow-md font-bold uppercase'>No hay resultados</p> : 
        
        (
          <div className='bg-white rounded-md shadow-md p-5'>
                  <h1 className="font-black text-3xl text-blue-900">Información del cliente: { client.nombre }</h1>
                  <p className="mt-3 mb-10">Ponte en contacto con el cliente para conocer más sobre sus deseos.</p>

                  <p>
                    <span className='text-gray-700 uppercase font-bold'>Cliente: </span> 
                    { client.nombre }
                  </p>
                  <p>
                    <span className='text-gray-700 uppercase font-bold'>Email: </span> 
                    { client.email }
                  </p>
                  { client.telefono && (  
                    <p>
                      <span className='text-gray-700 uppercase font-bold'>Telefono: </span> 
                      { client.telefono }
                    </p>
                  )}
                  <p>
                    <span className='text-gray-700 uppercase font-bold'>Empresa: </span> 
                    { client.empresa }
                  </p>

                  { client.notas && (  
                    <p>
                      <span className='text-gray-700 uppercase font-bold'>Notas: </span> 
                      { client.notas }
                    </p>
                  )}
          </div>
      ) 
    )   
  )
}

export default ViewClient