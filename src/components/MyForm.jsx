import { Formik, Form, Field} from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Alert from './Alert';
import Spinner from './Spinner';

const MyForm = ({ client, cargando }) => {

  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
               .min(3, 'El nombre es muy corto')
               .max(20, 'El nombre es muy largo')
               .required('El nombre del cliente es obligatorio'),
    empresa: Yup.string()
                .required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
              .email("Email no válido")
              .required('El email es obligatorio'),
    telefono: Yup.number()
                 .positive('No se aceptan números negativos')
                 .integer('No es un número entero')
                 .typeError('El número no es válido')
  });


  // HACEMOS POST A JSON SERVER
  const handleSubmit = async ( values ) => {

    try {

      let respuesta;

      if ( client.id ) {
        // EDITAR 
        
        const url = `http://localhost:4000/clientes/${ client.id }`;

          respuesta = await fetch( url, {
          method: 'PUT',
          body: JSON.stringify( values ),
          headers: {
            "Content-Type": "application/json"
          }
        })

      } else {
        
        // NUEVO REGISTRO
        const url = 'http://localhost:4000/clientes';

          respuesta = await fetch( url, {
          method: 'POST',
          body: JSON.stringify( values ),
          headers: {
            "Content-Type": "application/json"
          }
        })

      }

      await respuesta.json();

      navigate('/clientes');

    } catch ( error ) {
      console.log( error );
    }

  }

  return (

    cargando ? <Spinner /> : (
      <div className="bg-white mt-10 px-5 py-10 w-100 rounded-md shadow-md md:w-3/4 mx-auto">
        <h2 className="text-gray-600 font-bold text-xl uppercase text-center">{ client?.nombre ? 'Editar Cliente': 'Agregar Cliente'}</h2>

        <Formik
          initialValues={{
            nombre: client?.nombre ?? '',
            empresa: client?.empresa ?? '',
            email: client?.email ?? '',
            telefono: client?.telefono ?? '',
            notas: client?.notas ?? ''
          }}

          // Gracias a esto permite colocar los valores de inicio en el formulario. IMPORTANTE
          enableReinitialize = { true }

          // Espera a que se envie y luego se limpia
          onSubmit={ async (values, {resetForm})  => {
            await handleSubmit( values )
            resetForm();
          }}

          validationSchema = { nuevoClienteSchema }
        >

          { ( { errors, touched } ) => {
            return  (
            <Form className='mt-10'>
              <div className='mb-4'>
                <label className=' text-gray-800' htmlFor="nombre">Nombre</label>
                <Field 
                  placeholder="Saulo Román Santillán Nava"
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                  name = "nombre"
                />  

                { errors.nombre && touched.nombre ? ( 
                  <Alert> { errors.nombre } </Alert>
                ) : null } 

              </div>   

              <div className='mb-4'>
                <label className=' text-gray-800' htmlFor="empresa">Empresa</label>
                <Field 
                  placeholder="RomanDev"
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                  name="empresa"
                />  

                { errors.empresa && touched.empresa ? ( 
                  <Alert> { errors.empresa } </Alert>
                ) : null } 

              </div>  

              <div className='mb-4'>
                <label className=' text-gray-800' htmlFor="email">Email</label>
                <Field 
                  placeholder="tucorreo@ejemplo.com"
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                  name="email"
                />  

                { errors.email && touched.email ? ( 
                  <Alert> { errors.email } </Alert>
                ) : null } 
              </div>   

              <div className='mb-4'>
                <label className=' text-gray-800' htmlFor="telefono">Telefono</label>
                <Field 
                  placeholder="(449) 654 80 73"
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-2 bg-gray-50 border border-gray-300 rounded-md"
                  name="telefono"
                />  
                { errors.telefono && touched.telefono ? ( 
                  <Alert> { errors.telefono } </Alert>
                ) : null } 
              </div>   

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor="notas">Notas</label>
                <Field 
                  as="textarea"
                  placeholder="Notas del cliente"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-2 h-40 bg-gray-50 border border-gray-400 rounded-md"
                  name="notas"
                />  
              </div>       

              <input type="submit" value={ client?.nombre ? 'Guardar Cambios': 'Agregar Cliente'} className='mt-5 w-full bg-blue-800 p-2 text-white uppercase font-bold md:w-2/5 cursor-pointer rounded-md'/>
            </Form>
        )}}
        </Formik>

      </div>
    )
  )
}

// Default props
MyForm.defaultProps = {
  client: {},
  cargando: false
}

export default MyForm