import MyForm from "../components/MyForm"

const NewClient = () => {
  return (
    <>
      <h1 className="font-black text-3xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Llena los siguientes campos para registrar un cliente</p>

      <MyForm />
    </>
  )
}

export default NewClient
