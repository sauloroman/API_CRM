import { useNavigate } from 'react-router-dom';

const Client = ({ cliente, handleEliminar }) => {

  const navigate = useNavigate();

  const { nombre, empresa, email, telefono, id} = cliente;

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-5">{ nombre }</td>
      <td className="p-5">
        <p><span className="text-gray-800 uppercase font-bold">Email: </span>{ email }</p>
        <p><span className="text-gray-800 uppercase font-bold">Teléfono: </span>{ telefono }</p>
      </td>
      <td className="p-5">{ empresa }</td>
      <td className="p-5">

        <button 
          onClick={ () => navigate(`/clientes/${id}`) }
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-sm mb-3"
        >Ver</button>

        <button 
          onClick = { () => navigate(`/clientes/editar/${id}`) }
          type="button"
          className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-sm mb-3"
        >Editar</button>

        <button 
          onClick = {  () => handleEliminar( id )}
          type="button"
          className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-sm"
        >Eliminar</button>

      </td>
    </tr>
  )
}

export default Client