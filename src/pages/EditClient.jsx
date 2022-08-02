import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyForm from '../components/MyForm';


const EditClient = () => {

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
    <>
      <h1 className="font-black text-3xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Utiliza este formulario para editar datos de un cliente</p>

      { client?.nombre ? (
        <MyForm 
          client = { client }
          cargando = { cargando }
        />
      ) : (
        <p>Cliente no existente</p>
      )}

    </>
  )
}

export default EditClient